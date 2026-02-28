import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class ATMDenominationStock extends Model {}

ATMDenominationStock.init(
  {
    atm_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      validate: {
        notEmpty: {
          msg: "ATM ID is required.",
        },
        isInt: {
          msg: "ATM ID must be an integer.",
        },
      },
    },
    denomination_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
        notEmpty: {
          msg: "Denomination ID is required.",
        },
        isInt: {
          msg: "Denomination ID must be an integer.",
        },
      },
    },
    count: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "ATMDenominationStock",
    tableName: "atm_denomination_stocks",
    timestamps: false,
  },
);

export { ATMDenominationStock };
