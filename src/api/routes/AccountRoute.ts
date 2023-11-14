import express, { Request, Response } from "express";
import logger from "../../config/Logger";
const router = express.Router();

router.get("/", (_, res) => {
  res.json({ message: "Hello World!" });
});

router.post("/signin", [], (req: Request, res: Response) => {
  logger.info(req.body);
  res.json({ message: "Hello World!" });
});

export default router;
