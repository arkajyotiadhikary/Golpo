import { Request, Response } from "express";
import { generateOptionsHfInference } from "../utils/transformer.js";

/*
 * start the story using this function
 * take input username from the user
 * have a const prompt to form the startig prompt
 */

const constructPrompt = (scenario: string) => {
      return `Scenario: "${scenario}"\nGenerate three possible actions the character could take:\n1. Most dengerous:\n2. Medium danger:\n3. Safest:. In one sentence.`;
};

const startStory = async (req: Request, res: Response) => {
      const { username } = req.body;

      const prePrompt = `In the mystical land of Eldoria, where magic and technology coexist, you, ${username}, a renowned adventurer, are called upon to solve a mysterious series of occurrences. The first clue is a strange symbol found at the scene of the first incident. What do you do next?`;

      // Here ill have the generate options
      try {
            const options = await generateOptionsHfInference(constructPrompt(prePrompt));
            if (options) return res.status(200).json({ options });
      } catch (error: any) {
            console.error("Error generating options", error);
            throw error;
      }

      return res.status(200).json({ prompt: prePrompt });
};

export { startStory };
