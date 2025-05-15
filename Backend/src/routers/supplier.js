import { Router } from "express";
import { supplierController } from "../Controllers/supplierController.js";

export const router = Router(); 

router.get("/", supplierController.getAll);

router.get("/:id", supplierController.getOne);

router.post("/", supplierController.createOne); 

router.put("/:id", supplierController.editOne);

router.delete("/:id", supplierController.deleteOne); 