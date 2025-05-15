import { Router } from "express";
import { authController } from "../Controllers/authController.js"

export const router = Router();

router.post("/register", authController.register); 

router.post("/login", authController.login); 