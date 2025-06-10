import { Router } from "express";
import { productController } from "../Controllers/productController.js";
import { checkRoles } from "../Validators/checkRoles.js";
import upload from "../Data/upload.js";

export const router = Router();

router.get("/featured", productController.getFeatured);

router.get("/", productController.getAll);

router.get("/search", productController.getSearch);

router.get("/:id", productController.getOne);

router.put("/:id/featured", productController.toggleFeatured);

router.post("/", upload.single("image"), productController.createOne); 

router.put("/:id", productController.editOne);

router.delete("/:id", productController.deleteOne);

