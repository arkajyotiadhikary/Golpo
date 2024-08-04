import { Request, Response } from "express";
import { generateNextScenario, generateOptions, answerQuestion } from "../utils/transformer.js";

const getOptions = async (req: Request, res: Response) => {
      const { prompt } = req.body;
      console.log("Prompt is ", prompt);
      try {
            const options = await generateOptions(prompt, 3);
            if (options.length > 0) res.status(200).json({ options });
            else res.status(500).json({ error: "No options found." });
      } catch (error) {
            res.status(500).json({ error });
      }
};

export { getOptions };
