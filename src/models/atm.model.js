import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class ATM extends Model {}

ATM.init(
  {
    atm_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    //Bank ID
    branch_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Branch ID is required.",
        },
        isNumeric: {
          msg: "Branch ID must be an integer.",
        },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      validate: {
        isBoolean: {
          msg: "isActive must be a boolean value.",
        },
      },
    },
    allows_withdrawal: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      validate: {
        isBoolean: {
          msg: "allows_withdrawal must be a boolean value.",
        },
      },
    },
    allows_deposit: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      validate: {
        isBoolean: {
          msg: "allows_deposit must be a boolean value.",
        },
      },
    },
    location_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Location ID is required.",
        },
        isInt: {
          msg: "Location ID must be an integer.",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "ATM",
    tableName: "atms",
    timestamps: true,
  },
);

export { ATM };
