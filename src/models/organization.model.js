import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Organization extends Model {}

Organization.init(
  {
    org_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    account_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: { msg: "Account ID is required." },
        isInt: { msg: "Account ID must be an integer." },
      },
    },
    org_name: {
      type: DataTypes.CITEXT, //CITEXT = Case Insensitive Text
      unique: {
        msg: "Organization name already exists.",
      },
      allowNull: false,
      validate: {
        notEmpty: { msg: "Organization name cannot be empty." },
      },
    },
    org_abbreviation: {
      type: DataTypes.CITEXT,
      unique: {
        msg: "Organization abbreviation already exists.",
      },
      allowNull: false,
      validate: {
        notEmpty: { msg: "Organization abbreviation is required." },
      },
    },
    org_description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Organization description is required." },
      },
    },
    org_social_link: {
      type: DataTypes.STRING,
      validate: {
        isUrl: { msg: "Please provide a valid URL for the social link." },
      },
    },
    org_picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Organization picture path is required." },
      },
    },
    location_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: { msg: "Location ID is required." },
        isInt: { msg: "Location ID must be an integer." },
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
    sequelize, // this options [object] tells the model which database to use
    modelName: "Organization",
    tableName: "organizations",
    timestamps: true,
  },
);

export { Organization };
