export const corsOptions = {
  origin:
    process.env.NODE_ENV == "development"
      ? "localhost"
      : "https://supportus.polakiewicz.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const port = process.env.PORT || 3001;
