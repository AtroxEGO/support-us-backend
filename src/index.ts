import { port } from "./config/Config";
import app from "./config/Express";
import logger from "./config/Logger";

// # IDEAS
// - Payments
// - Polls
// - Food Ordering
// # TECH STACK
// - Backend
// Prisma
// GraphQL
// Docker
// - Frontend
// Tailwind CSS
// Next.js

// const account = await stripeController.accounts.create({
//   type: "express",
// });

// logger.info(account);

app.listen(port, () => {
  logger.info(`Server is running on port: ${port}`);
});
