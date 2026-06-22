import { User } from "../models/index.js";
import { USER_ROLES } from "../utils/user.roles.js";

const users = [
  {
    key: "developerAdmin",
    user_name: "Zeyad Gasser",
    role_id: USER_ROLES.DEVELOPER_ADMIN,
  },
  {
    key: "organizationOwner",
    user_name: "SkipQ Organization Owner",
    role_id: USER_ROLES.SUPER_ADMIN,
  },
  {
    key: "branchManager",
    user_name: "SkipQ Branch Manager",
    role_id: USER_ROLES.BRANCH_MANAGER,
  },
];

export const seedUsers = async () => {
  console.log("Seeding users...");

  const seededUsers = {};

  for (const userSeed of users) {
    const [user, created] = await User.findOrCreate({
      where: {
        user_name: userSeed.user_name,
        role_id: userSeed.role_id,
      },
      defaults: {
        user_name: userSeed.user_name,
        role_id: userSeed.role_id,
      },
    });

    seededUsers[userSeed.key] = user;
    console.log(`${created ? "Created" : "Found"} user: ${user.user_name}`);
  }

  console.log("Users seeding completed.");
  return seededUsers;
};
