import { Router } from "express";
import { generateOptions } from "../controllers/story.controller.js";

const router = Router();

router.post("/options", generateOptions);

export default router;
