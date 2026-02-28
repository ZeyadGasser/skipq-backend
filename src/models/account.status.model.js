import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class AccountStatus extends Model {}

AccountStatus.init(
  {
    status_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status_name: {
      type: DataTypes.ENUM(
        "Active",
        "Inactive",
        "Pending",
        "Suspended",
        "Rejected",
      ),
      allowNull: false,
      validate: {
        isIn: {
          args: [["Active", "Inactive", "Pending", "Suspended", "Rejected"]],
          msg: "Status must be one of: Active, Inactive, Pending, Suspended, or Rejected.",
        },
        notNull: {
          msg: "Status name is required.",
        },
        notEmpty: {
          msg: "Status name cannot be empty.",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "AccountStatus",
    tableName: "account_statuses",
    timestamps: false,
  },
);

export { AccountStatus };
