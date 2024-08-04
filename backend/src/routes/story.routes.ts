import { Router } from "express";
import { getOptions } from "../controllers/story.controller.js";

const router = Router();

router.post("/options", getOptions);
router.post("/answer", getOptions);

export default router;
