import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class AccountRefreshToken extends Model {}

AccountRefreshToken.init(
  {
    refresh_token_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    account_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    refresh_token_hash: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },

    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    revoked_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "AccountRefreshToken",
    tableName: "account_refresh_tokens",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",

    indexes: [
      {
        fields: ["account_id"],
        name: "idx_refresh_tokens_account_id",
      },
      {
        fields: ["account_id", "revoked_at"],
        name: "idx_refresh_tokens_account_id_revoked_at",
      },
    ],
  },
);

export { AccountRefreshToken };
