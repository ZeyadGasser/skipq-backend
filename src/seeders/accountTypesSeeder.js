import { AccountType } from "../models/index.js";
import { ACCOUNT_TYPE } from "../utils/account.types.js";

const accountTypes = [
  { type_id: ACCOUNT_TYPE.ORGANIZATION, type_name: "Organization" },
  { type_id: ACCOUNT_TYPE.BRANCH, type_name: "Branch" },
  { type_id: ACCOUNT_TYPE.ROOT, type_name: "Root" },
];

export const seedAccountTypes = async () => {
  console.log("Seeding account types...");

  for (const type of accountTypes) {
    const [record, created] = await AccountType.findOrCreate({
      where: { type_name: type.type_name },
      defaults: type,
    });

    console.log(
      `${created ? "Created" : "Found"} account type: ${record.type_name}`,
    );
  }

  console.log("Account types seeding completed.");
};
