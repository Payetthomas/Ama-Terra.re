import { Router } from "express";
import { newsletterController } from "../Controllers/newsletterController.js";

export const router = Router();

router.post("/", newsletterController.createOne);

router.get("/", newsletterController.getAll);

router.get("/today", newsletterController.getToday);

router.delete("/:id", newsletterController.deleteOne); 