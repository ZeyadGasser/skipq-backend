import { Governorate, Location } from "../models/index.js";

const createPoint = (longitude, latitude) => ({
  type: "Point",
  coordinates: [longitude, latitude],
});

const locationSeeds = [
  {
    location_id: 1,
    key: "organizationHeadquarters",
    governorateName: "Cairo",
    coordinates: createPoint(31.2357, 30.0444),
  },
  {
    location_id: 2,
    key: "mainBranch",
    governorateName: "Cairo",
    coordinates: createPoint(31.2333, 30.0561),
  },
  {
    location_id: 3,
    key: "mainAtm",
    governorateName: "Cairo",
    coordinates: createPoint(31.2367, 30.0459),
  },
];

export const seedLocations = async () => {
  console.log("Seeding locations...");

  const seededLocations = {};

  for (const locationSeed of locationSeeds) {
    const governorate = await Governorate.findOne({
      where: { name: locationSeed.governorateName },
    });

    if (!governorate) {
      throw new Error(
        `Governorate ${locationSeed.governorateName} must be seeded before locations.`,
      );
    }

    const [location, created] = await Location.findOrCreate({
      where: { location_id: locationSeed.location_id },
      defaults: {
        location_id: locationSeed.location_id,
        coordinates: locationSeed.coordinates,
        governorate_id: governorate.governorate_id,
      },
    });

    seededLocations[locationSeed.key] = location;
    console.log(
      `${created ? "Created" : "Found"} location: ${locationSeed.key}`,
    );
  }

  console.log("Locations seeding completed.");
  return seededLocations;
};
