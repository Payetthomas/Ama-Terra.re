import { Router } from "express";
import { contactMessageController } from "../Controllers/contactMessage.js";

export const router = Router();

router.post("/", contactMessageController.createOne);