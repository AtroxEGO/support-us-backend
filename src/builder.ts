import SchemaBuilder from "@pothos/core";
import { DateResolver } from "graphql-scalars";
import PrismaPlugin from "@pothos/plugin-prisma";
import ErrorsPlugin from "@pothos/plugin-errors";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import prisma from "./config/Prisma";
import { Context } from "./types";

export const builder = new SchemaBuilder<{
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
  PrismaTypes: PrismaTypes;
  Context: Context;
  AuthScopes: {
    loggedUser: boolean;
    verifiedUser: boolean;
  };
}>({
  plugins: [ErrorsPlugin, ScopeAuthPlugin, PrismaPlugin],
  errorOptions: {
    defaultTypes: [],
  },
  authScopes: async (context) => ({
    loggedUser: !!context.user,
    verifiedUser: !!context.user && context.user.stripeAccountBoardingCompleted,
  }),
  scopeAuthOptions: {
    unauthorizedError: (_parent, _context, _info, _result) =>
      new Error(`Not authorized`),
    authorizeOnSubscribe: true,
  },
  prisma: { client: prisma },
});

builder.queryType({});
builder.mutationType({});
builder.addScalarType("Date", DateResolver, {});
