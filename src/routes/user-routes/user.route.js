import express from "express";
import { CurrentUserController } from "../../controllers/user-controller/user.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const userrouter = express.Router();

userrouter.get("/currentUser", authMiddleware, CurrentUserController);

export { userrouter };
