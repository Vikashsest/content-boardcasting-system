import { DataTypes } from "sequelize";

import bcrypt from "bcrypt";
import { sequelize } from "../config/db.connection.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.ENUM("teacher", "principal"),
      defaultValue: "teacher",
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);
User.beforeCreate(async (user) => {
  if (user.password_hash) {
    user.password_hash = await bcrypt.hash(user.password_hash, 10);
  }
});

User.beforeUpdate(async (user) => {
  if (user.changed("password_hash")) {
    user.password_hash = await bcrypt.hash(user.password_hash, 10);
  }
});
export { User };
