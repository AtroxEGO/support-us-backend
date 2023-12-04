import express, { Request, Response } from "express";
import logger from "../../config/Logger";
import {
  refreshStripeAccountBoardingLink,
  verifyStripeAccountBoardingSuccessfull,
} from "../controllers/StripeController";

const router = express.Router();

router.get("/", (_, res) => {
  res.json({ message: "Hello World!" });
});

router.get("/refresh", refreshStripeAccountBoardingLink);

router.get("/verify", verifyStripeAccountBoardingSuccessfull);

export { router as StripeRouter };
