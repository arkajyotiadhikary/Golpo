import { Router } from "express";
import { story, getImage } from "../controllers/story.controller.js";

const router = Router();

router.post("/story", story);
router.post("/get-image",getImage);

export default router;
