import { Request, Response, NextFunction } from "express";
import logger from "../../config/Logger";

export const ErrorHandlingMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  const responseBody = {
    message: error.message || "Something went wrong",
    stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
  };

  logger.error(responseBody);
  res.json(responseBody);
};
