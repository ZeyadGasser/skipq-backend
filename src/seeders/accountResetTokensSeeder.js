import { AccountResetToken } from "../models/index.js";

export const seedAccountResetTokens = async () => {
  console.log("Checking account reset tokens...");

  const tokensCount = await AccountResetToken.count();

  console.log(
    `Found ${tokensCount} account reset token${tokensCount === 1 ? "" : "s"}. Runtime reset tokens are not seeded.`,
  );
};
