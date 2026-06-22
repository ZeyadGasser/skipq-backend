import { Role } from "../models/index.js";
import { USER_ROLES } from "../utils/user.roles.js";

const roles = [
  { role_id: USER_ROLES.SUPER_ADMIN, role_name: "SUPER_ADMIN" },
  { role_id: USER_ROLES.BRANCH_MANAGER, role_name: "BRANCH_MANAGER" },
  { role_id: USER_ROLES.DEVELOPER_ADMIN, role_name: "DEVELOPER_ADMIN" },
];

export const seedRoles = async () => {
  console.log("Seeding roles...");

  for (const role of roles) {
    const [record, created] = await Role.findOrCreate({
      where: { role_name: role.role_name },
      defaults: role,
    });

    console.log(`${created ? "Created" : "Found"} role: ${record.role_name}`);
  }

  console.log("Roles seeding completed.");
};
