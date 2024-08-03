import { Router } from "express";
import { generateStory } from "../controllers/story.controller.js";

const router = Router();

router.post("/gen", generateStory);

export default router;
