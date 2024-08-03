import express from "express";

// routes
import storyRoutes from "./routes/story.routes.js";

const app = express();

app.use(express.json());

app.use("/", storyRoutes);

export default app;
