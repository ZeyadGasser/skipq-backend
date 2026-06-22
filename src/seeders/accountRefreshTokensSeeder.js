import { AccountRefreshToken } from "../models/index.js";

export const seedAccountRefreshTokens = async () => {
  console.log("Checking account refresh tokens...");

  const tokensCount = await AccountRefreshToken.count();

  console.log(
    `Found ${tokensCount} account refresh token${tokensCount === 1 ? "" : "s"}. Runtime refresh tokens are not seeded.`,
  );
};
