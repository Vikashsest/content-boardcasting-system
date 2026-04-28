import express from "express";
import { loginController } from "../../controllers/auth-controllers/auth.controller.js";

const Authrouter = express.Router();

Authrouter.post("/login", loginController);

export { Authrouter };
