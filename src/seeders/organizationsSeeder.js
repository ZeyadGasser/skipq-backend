import { Organization } from "../models/index.js";

export const seedOrganizations = async (seededAccounts, seededLocations) => {
  console.log("Seeding organizations...");

  const [organization, created] = await Organization.findOrCreate({
    where: { org_abbreviation: "SKIPQ" },
    defaults: {
      account_id: seededAccounts.organization.account_id,
      org_name: "SkipQ Demo Organization",
      org_abbreviation: "SKIPQ",
      org_description:
        "Default organization seeded to make the SkipQ system usable immediately.",
      org_social_link: "https://skipq.local",
      org_picture: "/uploads/seed/skipq-organization.png",
      location_id: seededLocations.organizationHeadquarters.location_id,
      isActive: true,
    },
  });

  console.log(
    `${created ? "Created" : "Found"} organization: ${organization.org_name}`,
  );
  console.log("Organizations seeding completed.");

  return { main: organization };
};
