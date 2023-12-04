import cors from "cors";
import helmet from "helmet";
import express from "express";
import { ErrorHandlingMiddleware } from "../api/middlewares";
import router from "../api/routes/Router";
import { corsOptions } from "./Config";
import prisma from "./Prisma";
import logger from "./Logger";
import yogaRouter from "./Yoga";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "500kb" }));
app.use(helmet());
app.use(cors(corsOptions));
// app.use(pinoHttp({ logger }));

app.use(yogaRouter);

app.use("/", router);

app.use(ErrorHandlingMiddleware);

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  logger.info("Server is shutting down due to SIGINT");
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  logger.info("Server is shutting down due to SIGTERM");
});

export default app;
