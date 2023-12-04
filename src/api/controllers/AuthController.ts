import prisma from "../../config/Prisma";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { AuthPayload } from "../models/SignIn";
import { TokenExpiration } from "../../config/Config";
import { generateToken } from "../helpers/Auth";

type SingInInput = {
  email: string;
  password: string;
};

export const SignInUser = async (args: SingInInput) => {
  console.log(args);

  const user = await prisma.user.findUnique({
    where: { email: args.email },
  });

  if (!user || !bcrypt.compareSync(args.password, user.password)) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);

  const AuthPayload: AuthPayload = {
    token: token,
    userId: user.id,
  };

  return AuthPayload;
};
