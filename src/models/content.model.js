import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.connection.js";

const Content = sequelize.define(
  "Content",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    file_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    file_type: {
      type: DataTypes.STRING,
    },

    file_size: {
      type: DataTypes.INTEGER,
    },

    uploaded_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("uploaded", "pending", "approved", "rejected"),
      defaultValue: "uploaded",
    },

    rejection_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    approved_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    approved_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    end_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    rotation_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5,
    },
  },
  {
    timestamps: true,
  },
);

export { Content };
