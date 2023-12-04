import bcrypt from "bcrypt";
import { generateToken } from "../helpers/Auth";
import prisma from "../../config/Prisma";

type SignUpInput = {
  email: string;
  name: string;
  password: string;
};

export const createUser = async (args: SignUpInput) => {
  args.password = bcrypt.hashSync(args.password, 10);

  const token = generateToken(1);

  const exists = await prisma.user.findUnique({
    where: { email: args.email },
  });

  if (exists) throw new Error("Email already exists");

  const user = await prisma.user.create({
    data: {
      email: args.email,
      name: args.name,
      password: args.password,
    },
  });

  return {
    token: token,
    userId: user.id,
  };
};
