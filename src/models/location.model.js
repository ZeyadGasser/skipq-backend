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

    coordinates: {
      type: DataTypes.GEOMETRY("POINT", 4326),
      allowNull: false,
      validate: {
        notNull: { msg: "Coordinates are required." },
      },
    },

    governorate_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: { msg: "Governorate ID is required." },
        isInt: { msg: "Governorate ID must be an integer." },
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
