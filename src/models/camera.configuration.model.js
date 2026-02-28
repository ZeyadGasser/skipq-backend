import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class CameraConfiguration extends Model {}

CameraConfiguration.init(
  {
    camera_config_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    // The branch_id is placed here because CameraConfiguration is a CHILD of Branch.
    // In this One-to-One relationship, the 'dependent' entity carries the Foreign Key.
    // This ensures that a Branch can exist first, then we attach its configurations.
    // Each branch must have ONLY ONE configuration (One-to-One relationship).
    // The 'unique: true' constraint prevents assigning multiple configurations to the same branch
    branch_id: {
      type: DataTypes.BIGINT,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Username is required." },
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password hash is required." },
      },
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIP: {
          msg: "Please provide a valid IP address.",
        },
        notEmpty: { msg: "IP address is required." },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      validate: {
        isBoolean: { msg: "isActive must be a boolean." },
      },
    },
  },
  {
    sequelize,
    modelName: "CameraConfiguration",
    tableName: "camera_configurations",
    timestamps: false,
  },
);

export { CameraConfiguration };
