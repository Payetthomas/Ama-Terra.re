import { Router } from "express";
import { productController } from "../Controllers/productController.js";

export const router = Router();

router.get("/", productController.getAll);

router.get("/:id", productController.getOne);

router.post("/", productController.createOne); 

router.put("/:id", productController.editOne);

router.delete("/:id", productController.deleteOne); 

