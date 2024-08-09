import { Router } from "express";
import { story } from "../controllers/story.controller.js";

const router = Router();

router.post("/story", story);

export default router;
