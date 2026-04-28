import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { Authrouter } from "./routes/auth-routes/auth.route.js";
import { userrouter } from "./routes/user-routes/user.route.js";
import { contentrouter } from "./routes/content-routes/content.route.js";
import multer from "multer";

const app = express();
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      message: err.message,
    });
  }

  next();
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth", Authrouter);
app.use("/api/v1/user", userrouter);
app.use("/api/v1/content", contentrouter);
const PORT = process.env.PORT;

export default app;
