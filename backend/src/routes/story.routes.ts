import { Router } from "express";
import { story, getImage, getText } from "../controllers/story.controller.js";

const router = Router();

router.post("/story", story);
router.post("/get-image",getImage);
router.post("/get-text",getText);

export default router;
