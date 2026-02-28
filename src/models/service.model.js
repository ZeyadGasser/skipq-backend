import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Service extends Model {}

Service.init(
  {
    service_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    camera_view_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: { msg: "Camera view ID is required." },
        isInt: { msg: "Camera view ID must be an integer." },
      },
    },
    service_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Service name cannot be empty." },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      validate: {
        isBoolean: { msg: "isActive must be a boolean value." },
      },
    },
  },
  {
    sequelize,
    modelName: "Service",
    tableName: "services",
    timestamps: true,
  },
);

export { Service };
