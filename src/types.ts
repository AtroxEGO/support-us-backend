import { PrismaClient, User } from "@prisma/client";

export interface Context {
  db: PrismaClient;
  user: User["stripeAccountBoardingCompleted"] extends true
    ? User
    : VerifiedUser;
}

export interface VerifiedUser extends User {
  connectedAccountId: string;
}
