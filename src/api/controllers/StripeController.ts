import stripe from "stripe";
import { StripeSecretKey } from "../../config/Config";
import { Request, Response } from "express";
import prisma from "../../config/Prisma";
import logger from "../../config/Logger";

export const stripeController = new stripe(StripeSecretKey);

export const refreshStripeAccountBoardingLink = async (
  req: Request,
  res: Response
) => {
  const { account_id } = req.query;

  const accountLink = await stripeController.accountLinks.create({
    account: account_id as string,
    refresh_url: `http://localhost:3001/stripe/refresh?account_id=${account_id}`,
    return_url: `http://localhost:3001/stripe/verify?account_id=${account_id}`,
    type: "account_onboarding",
  });

  res.redirect(accountLink.url);
};

export const verifyStripeAccountBoardingSuccessfull = async (
  req: Request,
  res: Response
) => {
  const { account_id } = req.query;

  const account = await stripeController.accounts.retrieve(
    account_id as string
  );

  if (account.details_submitted) {
    await prisma.user.update({
      where: {
        connectedAccountId: "acct_1OH9D8C449LeHq5z",
      },
      data: {
        stripeAccountBoardingCompleted: true,
      },
    });
  }

  res.redirect("http://localhost:3001/");
};

export const createNewStripeProduct = async (req: Request, res: Response) => {
  const { name, description, image, features } = req.body;

  const metadata = {
    owner: "user_id",
  };

  const product = await stripeController.products.create({
    name,
    description,
    images: [image],
    features,
    metadata,
  });

  res.json(product);
};
