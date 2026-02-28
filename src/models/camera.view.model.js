import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class CameraView extends Model {}

CameraView.init(
  {
    camera_view_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    camera_config_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: { msg: "Camera configuration ID is required." },
        isInt: { msg: "Camera configuration ID must be an integer." },
      },
    },
    target_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Target ID is required." },
        isInt: { msg: "Target ID must be an integer." },
      },
    },
    waitingPeopleCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: { msg: "Waiting people count must be an integer." },
        min: {
          args: [0],
          msg: "Waiting people count cannot be negative.",
        },
      },
    },
    channel_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: { msg: "Channel number is required." },
        isInt: { msg: "Channel number must be an integer." },
      },
    },
    stream_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: { msg: "Please provide a valid stream URL." },
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
  },
  {
    sequelize,
    modelName: "CameraView",
    tableName: "camera_views",
    timestamps: false,
  },
);

export { CameraView };
