import { Router } from "express";
import { categoryController } from "../Controllers/categoryController.js";

export const router = Router();

router.post("/", categoryController.createOne); 

router.get("/", categoryController.getAll);

router.get("/:id", categoryController.getOne);

router.delete("/:id", categoryController.deleteOne);