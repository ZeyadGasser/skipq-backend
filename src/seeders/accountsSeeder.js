import bcrypt from "bcrypt";
import crypto from "crypto";
import { Account } from "../models/index.js";
import { ACCOUNT_STATUS } from "../utils/account.status.js";
import { ACCOUNT_TYPE } from "../utils/account.types.js";

const generatedPasswords = [];

const createPassword = (envValue) => {
  if (envValue) return { password: envValue, generated: false };

  return {
    password: crypto.randomBytes(12).toString("base64url"),
    generated: true,
  };
};

export const seedAccounts = async (seededUsers) => {
  console.log("Seeding accounts...");

  const developerAdminPassword = createPassword(
    process.env.DEVELOPER_ADMIN_PASSWORD,
  );
  const organizationPassword = createPassword(process.env.SEED_ORG_PASSWORD);
  const branchPassword = createPassword(process.env.SEED_BRANCH_PASSWORD);

  const accounts = [
    {
      key: "developerAdmin",
      account_email: "zeyadgasser2510@gmail.com",
      password: developerAdminPassword.password,
      generated: developerAdminPassword.generated,
      user_id: seededUsers.developerAdmin.user_id,
      status_id: ACCOUNT_STATUS.ACTIVE,
      type_id: ACCOUNT_TYPE.ROOT,
    },
    {
      key: "organization",
      account_email: "organization.admin@skipq.local",
      password: organizationPassword.password,
      generated: organizationPassword.generated,
      user_id: seededUsers.organizationOwner.user_id,
      status_id: ACCOUNT_STATUS.ACTIVE,
      type_id: ACCOUNT_TYPE.ORGANIZATION,
    },
    {
      key: "branch",
      account_email: "branch.manager@skipq.local",
      password: branchPassword.password,
      generated: branchPassword.generated,
      user_id: seededUsers.branchManager.user_id,
      status_id: ACCOUNT_STATUS.ACTIVE,
      type_id: ACCOUNT_TYPE.BRANCH,
    },
  ];

  const seededAccounts = {};

  for (const accountSeed of accounts) {
    const passwordHash = await bcrypt.hash(accountSeed.password, 10);
    const [account, created] = await Account.findOrCreate({
      where: { account_email: accountSeed.account_email },
      defaults: {
        account_email: accountSeed.account_email,
        account_password_hash: passwordHash,
        user_id: accountSeed.user_id,
        status_id: accountSeed.status_id,
        type_id: accountSeed.type_id,
      },
    });

    seededAccounts[accountSeed.key] = account;
    console.log(
      `${created ? "Created" : "Found"} account: ${account.account_email}`,
    );

    if (created && accountSeed.generated) {
      generatedPasswords.push({
        email: accountSeed.account_email,
        password: accountSeed.password,
      });
    }
  }

  console.log("Accounts seeding completed.");
  return seededAccounts;
};

export const printGeneratedPasswords = () => {
  if (!generatedPasswords.length) return;

  console.log("Generated seed account passwords:");
  for (const account of generatedPasswords) {
    console.log(`${account.email}: ${account.password}`);
  }
};
