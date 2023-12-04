import { stripeController } from "../controllers/StripeController";

export const getAccountBoardingLink = async (
  accountId: string
): Promise<string> => {
  const accountLink = await stripeController.accountLinks.create({
    account: accountId,
    refresh_url: `http://localhost:3001/stripe/refresh?account_id=${accountId}`,
    return_url: `http://localhost:3001/stripe/verify?account_id=${accountId}`,
    type: "account_onboarding",
  });

  return accountLink.url;
};
