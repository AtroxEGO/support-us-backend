import express from "express";
import helmet from "helmet";
import cors from "cors";
import { corsOptions, port } from "./src/config/Config";
import logger from "./src/config/Logger";
import Router from "./src/api/routes/Router";
import { ErrorHandlingMiddleware } from "./src/api/middlewares";
// import { pinoHttp } from "pino-http";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "500kb" }));
app.use(helmet());
app.use(cors(corsOptions));
// app.use(pinoHttp({ logger }));

app.use("/api", Router);

app.use(ErrorHandlingMiddleware);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
