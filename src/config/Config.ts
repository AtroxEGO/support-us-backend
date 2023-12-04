export const corsOptions = {
  origin:
    process.env.NODE_ENV == "development"
      ? "localhost"
      : "https://supportus.polakiewicz.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const port = process.env.PORT || 3001;

export const TokenExpiration =
  process.env.NODE_ENV === "production" ? "30min" : "999d"; // Length of time before token expires

export const StripeSecretKey =
  (process.env.NODE_ENV === "production"
    ? process.env.STRIPE_LIVE_SECRET_KEY
    : process.env.STRIPE_TEST_SECRET_KEY) || "sk_test_1234567890";
