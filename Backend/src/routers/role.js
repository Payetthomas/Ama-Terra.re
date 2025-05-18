import { Router } from "express"; 
import { roleController } from "../Controllers/roleController.js";

export const router = Router();

router.post("/", roleController.createOne);

router.get("/", roleController.getAll); 

router.get("/:id", roleController.getOne);

router.put("/:id", roleController.updateOne);

router.delete("/:id", roleController.deleteOne); 

router.post("/:roleId/user/:userId", roleController.addRoletoUser);

router.delete("/:roleId/user/:userId", roleController.removeRoletoUser); 