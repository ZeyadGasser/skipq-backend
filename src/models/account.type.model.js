import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class AccountType extends Model {}

AccountType.init(
  {
    type_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    type_name: {
      type: DataTypes.ENUM("Organization", "Branch", "Root"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["Organization", "Branch", "Root"]],
          msg: "Type must be either Organization, Branch, or Root.",
        },
        notNull: {
          msg: "Type name is required.",
        },
        notEmpty: {
          msg: "Type name cannot be empty.",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "AccountType",
    tableName: "account_types",
    timestamps: false,
  },
);

export { AccountType };
