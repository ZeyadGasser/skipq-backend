import { Branch } from "../models/index.js";

export const seedBranches = async (
  seededAccounts,
  seededOrganizations,
  seededLocations,
) => {
  console.log("Seeding branches...");

  const [branch, created] = await Branch.findOrCreate({
    where: { account_id: seededAccounts.branch.account_id },
    defaults: {
      account_id: seededAccounts.branch.account_id,
      branch_name: "SkipQ Main Branch",
      isActive: true,
      org_id: seededOrganizations.main.org_id,
      location_id: seededLocations.mainBranch.location_id,
      org_abbreviation: seededOrganizations.main.org_abbreviation,
      logo_url: "https://example.com/skipq-main-branch-logo.png",
    },
  });

  console.log(`${created ? "Created" : "Found"} branch: ${branch.branch_name}`);
  console.log("Branches seeding completed.");

  return { main: branch };
};
