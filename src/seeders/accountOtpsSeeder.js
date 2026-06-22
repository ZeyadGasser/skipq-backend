import { AccountOTP } from "../models/index.js";

export const seedAccountOtps = async () => {
  console.log("Checking account OTPs...");

  const otpsCount = await AccountOTP.count();

  console.log(
    `Found ${otpsCount} account OTP${otpsCount === 1 ? "" : "s"}. Runtime OTP records are not seeded.`,
  );
};
