import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
class User extends Model {}

User.init(
  {
    user_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "User name cannot be empty." },
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Role ID is required." },
        isInt: { msg: "Role ID must be an integer." },
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  },
);

export { User };
