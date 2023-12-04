import { Router } from "express";
import { createYoga } from "graphql-yoga";
import helmet from "helmet";
import { schema } from "../schema";
import prisma from "./Prisma";
import { getUserFromAuthHeader } from "../api/helpers/Auth";

const yogaRouter = Router();

const yogaHelmet = helmet({
  contentSecurityPolicy: {
    directives: {
      "style-src": ["'self'", "unpkg.com"],
      "script-src": ["'self'", "unpkg.com", "'unsafe-inline'"],
      "img-src": ["'self'", "raw.githubusercontent.com"],
    },
  },
});

export const yoga = createYoga({
  schema: schema,
  logging: false,
  context: async ({ request }) => ({
    db: prisma,
    user: await getUserFromAuthHeader(
      request.headers.get("authorization") || ""
    ),
  }),
});

yogaRouter.use(yogaHelmet);
yogaRouter.use(yoga.graphqlEndpoint, yoga);

export default yogaRouter;
