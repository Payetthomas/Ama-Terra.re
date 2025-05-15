import {Router} from "express"; 
import { promotionController } from "../Controllers/promotionController.js";

export const router = Router();

router.get("/", promotionController.getAll);

router.get("/:id", promotionController.getOne);

router.post("/", promotionController.createOne);

router.put("/:id", promotionController.editOne);

router.delete("/:id", promotionController.deleteOne);