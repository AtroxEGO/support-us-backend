import { User } from "@prisma/client";
import prisma from "../../config/Prisma";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import logger from "../../config/Logger";
import { TokenExpiration } from "../../config/Config";

interface DecodedToken extends JwtPayload {
  id: number;
}

export const getUserFromAuthHeader = async (authHeader: string) => {
  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");

  let decodedToken: DecodedToken | null;

  try {
    decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as DecodedToken;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }

  if (!decodedToken) return null;

  const user = await prisma.user.findUnique({
    where: { id: 2 },
  });
  return user
    ? (({ password, ...userWithoutPassword }) => userWithoutPassword)(user)
    : null;
};

export const generateToken = (userId: number) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as Secret, {
    expiresIn: TokenExpiration,
  });

  return token;
};
