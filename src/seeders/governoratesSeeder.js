import { Governorate } from "../models/index.js";

const createBoundary = (west, south, east, north) => ({
  type: "Polygon",
  coordinates: [
    [
      [west, south],
      [east, south],
      [east, north],
      [west, north],
      [west, south],
    ],
  ],
});

const governorates = [
  {
    name: "Cairo",
    boundary: createBoundary(31.12, 29.84, 31.64, 30.35),
  },
  {
    name: "Giza",
    boundary: createBoundary(30.72, 29.71, 31.24, 30.23),
  },
  {
    name: "Alexandria",
    boundary: createBoundary(29.49, 30.98, 30.18, 31.37),
  },
  {
    name: "Qalyubia",
    boundary: createBoundary(31.05, 30.08, 31.52, 30.62),
  },
  {
    name: "Dakahlia",
    boundary: createBoundary(31.25, 30.49, 32.08, 31.34),
  },
  {
    name: "Sharqia",
    boundary: createBoundary(31.33, 30.16, 32.28, 30.94),
  },
];

export const seedGovernorates = async () => {
  console.log("Seeding governorates...");

  for (const governorate of governorates) {
    const [record, created] = await Governorate.findOrCreate({
      where: { name: governorate.name },
      defaults: governorate,
    });

    console.log(`${created ? "Created" : "Found"} governorate: ${record.name}`);
  }

  console.log("Governorates seeding completed.");
};
