import express from "express";
import cors from "cors";

// routes
import storyRoutes from "./routes/story.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", storyRoutes);

export default app;
