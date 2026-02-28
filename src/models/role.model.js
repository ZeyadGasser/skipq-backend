import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Role extends Model {}

Role.init(
  {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.ENUM("SUPER_ADMIN", "BRANCH_MANAGER", "DEVELOPER_ADMIN"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["SUPER_ADMIN", "BRANCH_MANAGER", "DEVELOPER_ADMIN"]],
          msg: "Role must be either SUPER_ADMIN, BRANCH_MANAGER, or DEVELOPER_ADMIN.",
        },
        notNull: {
          msg: "Role name is required.",
        },
        notEmpty: {
          msg: "Role name cannot be empty.",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
    timestamps: false,
  },
);

export { Role };
