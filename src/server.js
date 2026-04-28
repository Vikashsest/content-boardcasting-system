import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { sequelize } from "./config/db.connection.js";
console.log("CURRENT FILE:", import.meta.url);
const PORT = process.env.PORT;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected ✅");
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("DB connection failed ❌", error);
  }
})();
