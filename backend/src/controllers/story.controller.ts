import { Request, Response } from "express";
import { generate } from "../utils/transformer.js";

const generateStory = async (req: Request, res: Response) => {
      const { prompt } = req.body;
      console.log("Prompt is ", prompt);
      try {
            const story = await generate(prompt);
            if (story) res.status(200).json({ story });
      } catch (error) {
            res.status(500).json({ error });
      }
};

export { generateStory };
