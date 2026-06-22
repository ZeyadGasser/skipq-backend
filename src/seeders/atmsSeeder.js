import { ATM } from "../models/index.js";

export const seedAtms = async (seededBranches, seededLocations) => {
  console.log("Seeding ATMs...");

  const [atm, created] = await ATM.findOrCreate({
    where: {
      branch_id: seededBranches.main.branch_id,
      atm_name: "SkipQ Main ATM",
    },
    defaults: {
      branch_id: seededBranches.main.branch_id,
      allows_withdrawal: true,
      allows_deposit: true,
      atm_name: "SkipQ Main ATM",
      location_id: seededLocations.mainAtm.location_id,
    },
  });

  console.log(`${created ? "Created" : "Found"} ATM: ${atm.atm_name}`);
  console.log("ATMs seeding completed.");

  return { main: atm };
};
