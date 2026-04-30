import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Branch extends Model {}

Branch.init(
  {
    branch_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    account_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Account ID is required." },
        isInt: { msg: "Account ID must be an integer." },
      },
    },
    branch_name: {
      type: DataTypes.CITEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Branch name cannot be empty." },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        isBoolean: { msg: "isActive must be a boolean." },
      },
    },
    org_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: { msg: "Organization ID is required." },
        isInt: { msg: "Organization ID must be an integer." },
      },
    },
    location_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Location ID is required." },
        isInt: { msg: "Location ID must be an integer." },
      },
    },
    org_abbreviation: {
      type: DataTypes.CITEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Organization abbreviation is required." },
      },
    },
    logo_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          msg: "Logo URL must be a valid URL.",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Branch",
    tableName: "branches",
    timestamps: true,
  },
);

export { Branch };
