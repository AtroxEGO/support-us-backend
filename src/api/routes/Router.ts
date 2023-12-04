import express from "express";
import { StripeRouter } from "./index";
const router = express.Router();

router.get("/", (_, res) => {
  res.json("Ok");
});

router.use("/stripe", StripeRouter);

router.all("*", (_, res) => {
  res.status(404);
  throw new Error("404 Not Found");
});

export default router;
