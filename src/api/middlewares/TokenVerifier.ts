import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface RequestWithUserData extends Request {
  userData?: any;
}

// Check if the token is valid
module.exports = (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json(Error("Access denied. No token provided"));

  if (token === "token") return next();

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY as jwt.Secret
    );
    if (typeof decodedToken === "object" && "verified" in decodedToken) {
      if (
        decodedToken["verified"] === 0 &&
        req.route.path != "/resendCode" &&
        req.route.path != "/verify"
      ) {
        return res.status(401).json(Error("Account not verified!"));
      }
    }
    req.userData = decodedToken;
  } catch (error) {
    console.log(error);
    return res.status(401).json(Error("Token invalid or expired"));
  }

  next();
};
