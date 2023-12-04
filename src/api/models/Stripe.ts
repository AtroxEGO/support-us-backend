import { features } from "process";
import { builder } from "../../builder";
import prisma from "../../config/Prisma";
import { VerifiedContext } from "../../types";
import { stripeController } from "../controllers/StripeController";
import { getAccountBoardingLink } from "../helpers/Stripe";
import logger from "../../config/Logger";

builder.mutationField("createStripeAccount", (t) =>
  t.field({
    errors: {
      types: [Error],
    },
    type: "String",
    authScopes: {
      loggedUser: true,
    },
    resolve: async (_root, _args, ctx) => {
      const account = await stripeController.accounts.create({
        type: "express",
        email: ctx.user.email,
      });

      await prisma.user.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          connectedAccountId: account.id,
        },
      });

      return await getAccountBoardingLink(account.id);
    },
  })
);

builder.mutationField("createStripeProduct", (t) =>
  t.field({
    errors: {
      types: [Error],
    },
    type: "String",
    authScopes: {
      verifiedUser: true,
    },
    args: {
      name: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
      image: t.arg.string({ required: true }),
      features: t.arg.stringList({ defaultValue: [] }),
      price: t.arg.string({ required: true }),
      recurring: t.arg.boolean({ defaultValue: false }),
    },

    resolve: async (_root, args, ctx) => {
      const userProducts = await stripeController.products.search({
        query: `metadata['ownerEmail']:'${ctx.user.email}' AND active:"true"`,
      });

      logger.info(userProducts);

      const didUserHitProductLimit = userProducts.data.length >= 1;
      if (didUserHitProductLimit)
        throw new Error(
          "Product limit reached, please remove or update a product."
        );

      const currency =
        (await stripeController.accounts.retrieve(ctx.user.connectedAccountId))
          .default_currency || "usd";

      const product = await stripeController.products.create({
        name: args.name,
        description: args.description,
        images: [args.image],
        metadata: {
          ownerId: ctx.user.id,
          ownerEmail: ctx.user.email,
        },
        default_price_data: {
          currency: currency,
          recurring: args.recurring
            ? {
                interval: "month",
              }
            : undefined,
          unit_amount_decimal: args.price,
        },
        features: args.features?.map((feature) => ({
          name: feature,
        })),
      });

      logger.info(product);

      return "Success";
    },
  })
);
