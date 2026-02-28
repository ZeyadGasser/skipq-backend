import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class ViewTarget extends Model {}

ViewTarget.init(
  {
    target_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Type ID is required." },
        isInt: { msg: "Type ID must be an integer." },
      },
    },
  },
  {
    sequelize,
    modelName: "ViewTarget",
    tableName: "view_targets",
    timestamps: false,
  },
);

export { ViewTarget };
