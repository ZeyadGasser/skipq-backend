import { DataTypes, Model } from "sequelize"; 
import { sequelize } from "../config/db.js"; 

class AccountOTP extends Model {}

AccountOTP.init(
  {
    otp_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    account_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    otp_code: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },

    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    used_at: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
  },
  {
    sequelize,
    modelName: "AccountOTP",
    tableName: "account_otps",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",

    indexes: [
      {
        fields: ["account_id"],
        name: "idx_otps_account_id",
      },
      {
        fields: ["account_id", "used_at"],
        name: "idx_otps_account_id_used_at",
      },
    ],
  },
);

export { AccountOTP };