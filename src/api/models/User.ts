import { builder } from "../../builder";
import prisma from "../../config/Prisma";
import { createUser } from "../controllers/UserController";
import { AuthPayload } from "./SignIn";

// User Object
builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    name: t.exposeString("name"),
    page: t.relation("page", { nullable: true }),
  }),
});

// Query Users
builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: async (query, _root, _args, _ctx, _info) => {
      return prisma.user.findMany({ ...query });
    },
  })
);

// Create User
builder.mutationField("signup", (t) =>
  t.field({
    errors: {
      types: [Error],
    },
    type: AuthPayload,
    args: {
      email: t.arg.string({ required: true, description: "Email for user" }),
      name: t.arg.string({ required: true, description: "Name for user" }),
      password: t.arg.string({
        required: true,
        description: "Password for user",
      }),
    },
    resolve: async (_root, args) => createUser(args),
  })
);
