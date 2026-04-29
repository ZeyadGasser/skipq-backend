import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Governorate extends Model {}

Governorate.init(
  {
    governorate_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Governorate name is required." },
        notEmpty: { msg: "Governorate name cannot be empty." },
      },
    },

    boundary: {
      type: DataTypes.GEOMETRY("POLYGON", 4326),
      allowNull: false,
      validate: {
        notNull: { msg: "Governorate boundary is required." },
      },
    },
  },
  {
    sequelize,
    modelName: "Governorate",
    tableName: "governorates",
    timestamps: false,
  },
);

export { Governorate };
