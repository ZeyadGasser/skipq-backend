import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class ViewType extends Model {}

ViewType.init(
  {
    type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Type name cannot be empty." },
      },
    },
  },
  {
    sequelize,
    modelName: "ViewType",
    tableName: "view_types",
    timestamps: false,
  },
);

export { ViewType };
