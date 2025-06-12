import express from "express";
import { eventController } from "../Controllers/eventController.js";
import upload from "../Data/upload.js";

export const router = express.Router();


router.get("/", eventController.getAll);

router.get("/:id", eventController.getOne);

router.post("/", upload.single("image"), eventController.createOne);

router.put("/:id", eventController.editOne);

router.delete("/:id", eventController.deleteOne);


