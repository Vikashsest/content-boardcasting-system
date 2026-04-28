import { sequelize } from "../config/db.connection.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
const seedUsers = async () => {
  try {
    await sequelize.sync();
    const existingUsers = await User.findAll();
    if (existingUsers.length > 0) {
      console.log("Users already seeded ✅");
      return;
    }

    await User.bulkCreate([
      {
        name: "Principal",
        email: "principal@test.com",
        password: await bcrypt.hash("123456", 10),
        role: "principal",
      },
      {
        name: "Teacher",
        email: "teacher@test.com",
        password: await bcrypt.hash("123456", 10),
        role: "teacher",
      },
    ]);

    console.log("Users seeded successfully 🚀");
    process.exit();
  } catch (error) {
    console.error("Seeding failed ❌", error);
    process.exit(1);
  }
};

seedUsers();
