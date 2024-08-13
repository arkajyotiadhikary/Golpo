import express from "express";
import cors from "cors";
import {limiter} from "./utils/limiter.js";
// routes
import storyRoutes from "./routes/story.routes.js";

const app = express();

app.use(cors());
app.use(limiter);

app.use(express.json());

app.use("/", storyRoutes);

export default app;
