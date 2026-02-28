import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Account extends Model {}

Account.init(
  {
    account_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    account_email: {
      type: DataTypes.CITEXT, // NOTE: CITEXT requires PostgreSQL extension
      allowNull: false,
      // We define 'unique' in the model for "Error Mapping".
      // Even though the database enforces uniqueness, defining it here
      // allows Sequelize to catch database errors and return
      // our custom "msg" instead of a generic system error.
      unique: {
        msg: "Email address already exists.", //Custom Validation Messages
      },
      validate: {
        isEmail: {
          msg: "Please provide a valid email address.",
        },
        notEmpty: {
          msg: "Email cannot be empty.",
        },
      },
    },
    account_password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required.",
        },
        len: {
          args: [60, 60],
          msg: "Invalid password hash length.",
        },
      },
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Account must be linked to a user.",
        },
        isNumeric: {
          msg: "User ID must be an integer.",
        },
      },
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isInt: {
          msg: "Status ID must be an integer.",
        },
      },
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Account Type ID must be an integer.",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Account",
    tableName: "accounts",
    timestamps: true,
  },
);

export { Account };
