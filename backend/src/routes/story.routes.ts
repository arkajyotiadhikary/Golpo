import { Router } from "express";
import { startStory } from "../controllers/story.controller.js";

const router = Router();

router.post("/start", startStory);

export default router;
