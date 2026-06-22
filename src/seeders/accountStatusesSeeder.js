import { AccountStatus } from "../models/index.js";
import { ACCOUNT_STATUS } from "../utils/account.status.js";

const accountStatuses = [
  { status_id: ACCOUNT_STATUS.ACTIVE, status_name: "Active" },
  { status_id: ACCOUNT_STATUS.INACTIVE, status_name: "Inactive" },
  { status_id: ACCOUNT_STATUS.PENDING, status_name: "Pending" },
  { status_id: ACCOUNT_STATUS.SUSPENDED, status_name: "Suspended" },
  { status_id: ACCOUNT_STATUS.REJECTED, status_name: "Rejected" },
];

export const seedAccountStatuses = async () => {
  console.log("Seeding account statuses...");

  for (const status of accountStatuses) {
    const [record, created] = await AccountStatus.findOrCreate({
      where: { status_name: status.status_name },
      defaults: status,
    });

    console.log(
      `${created ? "Created" : "Found"} account status: ${record.status_name}`,
    );
  }

  console.log("Account statuses seeding completed.");
};
