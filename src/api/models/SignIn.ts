import { builder } from "../../builder";
import prisma from "../../config/Prisma";
import { SignInUser as SignInUser } from "../controllers/AuthController";

export type AuthPayload = {
  token: string;
  userId: number;
};

export const AuthPayload = builder
  .objectRef<AuthPayload>("AuthPayload")
  .implement({
    description: "Payload for signin, return token and user",
    fields: (t) => ({
      token: t.exposeString("token", {
        description: "Token for user authentication",
      }),
      user: t.prismaField({
        type: "User",
        description: "User data",
        resolve: (_query, root, _args, _ctx, _info) =>
          prisma.user.findUniqueOrThrow({
            where: {
              id: root.userId,
            },
          }),
      }),
    }),
  });

builder.mutationField("signin", (t) =>
  t.field({
    errors: {
      types: [Error],
    },
    type: AuthPayload,
    args: {
      email: t.arg.string({ required: true, description: "Email for user" }),
      password: t.arg.string({
        required: true,
        description: "Password for user",
      }),
    },
    resolve: async (_root, args) => SignInUser(args),
  })
);
