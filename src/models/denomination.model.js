import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Denomination extends Model {}

Denomination.init(
  {
    denomination_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Amount is required." },
        isInt: { msg: "Amount must be an integer." },
        min: {
          args: [1],
          msg: "Amount must be greater than 0.",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Denomination",
    tableName: "denominations",
    timestamps: false,
  },
);

export { Denomination };
