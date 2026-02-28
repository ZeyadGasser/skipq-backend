import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Location extends Model {}

Location.init(
  {
    location_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
      validate: {
        notNull: { msg: "Latitude is required." },
        isDecimal: { msg: "Latitude must be a decimal number." },
        min: {
          args: [-90],
          msg: "Latitude must be between -90 and 90.",
        },
        max: {
          args: [90],
          msg: "Latitude must be between -90 and 90.",
        },
      },
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
      validate: {
        notNull: { msg: "Longitude is required." },
        isDecimal: { msg: "Longitude must be a decimal number." },
        min: {
          args: [-180],
          msg: "Longitude must be between -180 and 180.",
        },
        max: {
          args: [180],
          msg: "Longitude must be between -180 and 180.",
        },
      },
    },
    governorate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Governorate name cannot be empty." },
      },
    },
  },
  {
    sequelize,
    modelName: "Location",
    tableName: "locations",
    timestamps: false,
  },
);

export { Location };
