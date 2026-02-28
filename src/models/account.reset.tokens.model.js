import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class AccountResetToken extends Model {}

AccountResetToken.init(
  {
    reset_token_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    account_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Reset token must be linked to an account.",
        },
        isNumeric: {
          msg: "Account ID must be an integer.",
        },
      },
    },

    token_hash: {
      type: DataTypes.STRING(64), // sha256 length
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Token hash is required.",
        },
      },
    },

    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Expiration date is required.",
        },
        isDate: {
          msg: "Expiration must be a valid date.",
        },
      },
    },

    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "AccountResetToken",
    tableName: "account_reset_tokens",
    timestamps: true,
  },
);

export { AccountResetToken };
