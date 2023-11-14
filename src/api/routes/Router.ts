import express from "express";
import { AccountRouter } from ".";
const router = express.Router();

router.use("/account", AccountRouter);

router.all("*", (_, res) => {
  res.status(404);
  throw new Error("404 Not Found");
});

export default router;
