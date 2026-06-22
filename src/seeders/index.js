import dotenv from "dotenv";
import { sequelize } from "../config/db.js";
import { seedAccountOtps } from "./accountOtpsSeeder.js";
import { seedAccountRefreshTokens } from "./accountRefreshTokensSeeder.js";
import { seedAccounts, printGeneratedPasswords } from "./accountsSeeder.js";
import { seedAccountResetTokens } from "./accountResetTokensSeeder.js";
import { seedAccountStatuses } from "./accountStatusesSeeder.js";
import { seedAccountTypes } from "./accountTypesSeeder.js";
import { seedAtms } from "./atmsSeeder.js";
import { seedBranches } from "./branchesSeeder.js";
import { seedGovernorates } from "./governoratesSeeder.js";
import { seedLocations } from "./locationsSeeder.js";
import { seedOrganizations } from "./organizationsSeeder.js";
import { seedPermissions } from "./permissionsSeeder.js";
import { seedRoles } from "./rolesSeeder.js";
import { seedUsers } from "./usersSeeder.js";

dotenv.config();

const runSeeders = async () => {
  try {
    console.log("Starting database seeders...");

    await sequelize.authenticate();
    console.log("Database connection established.");

    await seedRoles();
    await seedPermissions();
    await seedAccountStatuses();
    await seedAccountTypes();
    await seedGovernorates();
    const seededLocations = await seedLocations();
    const seededUsers = await seedUsers();
    const seededAccounts = await seedAccounts(seededUsers);
    const seededOrganizations = await seedOrganizations(
      seededAccounts,
      seededLocations,
    );
    const seededBranches = await seedBranches(
      seededAccounts,
      seededOrganizations,
      seededLocations,
    );
    await seedAtms(seededBranches, seededLocations);
    await seedAccountResetTokens();
    await seedAccountRefreshTokens();
    await seedAccountOtps();

    printGeneratedPasswords();

    console.log("All seeders completed successfully.");
    process.exitCode = 0;
  } catch (error) {
    console.error("Database seeding failed.");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
    console.log("Database connection closed.");
  }
};

runSeeders();
