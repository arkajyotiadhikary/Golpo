import { Request, Response } from "express";
import { generateOptionsHfInference, generateScenarioHfInference, generateImageFromPrompt, generateTextFromPrompt } from "../utils/transformer.js";
import Redis from 'ioredis';
import PointSystem from '../utils/luck.js';
/*
 * start the story using this function
 * take input username from the user
 * have a const prompt to form the startig prompt
 */

const redis = new Redis();

const gameManager = async (scenario: string, gamestat: "start" | "continue" | "end", riskLevel: string, username?: string, useroption?: string) => {

  console.log("Running game manager");

  switch (gamestat) {
    case "start": {
      console.log(`Game has been started for the user ${username}`);
      const prePrompt = `In the mystical land of Eldoria, where magic and technology coexist, you, ${username}, a renowned adventurer, are called upon to solve a mysterious series of occurrences. The first clue is a strange symbol found at the scene of the first incident. What do you do next?`;
      try {
        const options = await generateOptionsHfInference(prePrompt);
        if (options) return {
          scenario: prePrompt,
          options
        };
      } catch (error: any) {
        console.error("Error generating starting options");
        throw error;
      }
    }
    case "continue": {
      //TODO create a prompt with prev scenario and user option
      //insead of sending description from utins/transformer send it from here
      //using ai generate the next scenerio and the options
      try {
        const nextScenario = await generateScenarioHfInference(scenario, useroption!, riskLevel);
        const options = await generateOptionsHfInference(nextScenario!);
        if (nextScenario && options)
          return {
            scenario: nextScenario,
            options
          };
      } catch (error: any) {
        console.log("Error generating scenario", error);
        throw error;
      }
    }
    case "end": {
      return;
    }
    default:
      {
        return;
      }
  }
}

const story = async (req: Request, res: Response) => {
  const { stat, username, scenario, useroption, riskLevel } = req.body;
  console.log("Data recived: ", { username, stat, scenario, useroption, riskLevel });

  const getUserPoint = await redis.get(`user:${username}`);
  let userPoint = null;

  if (getUserPoint !== null) userPoint = JSON.parse(getUserPoint);

  if (userPoint === null) userPoint = {
    health: 100,
    wealth: 10,
    luck: 50,
  };

  const pointSystem = new PointSystem(Number(userPoint.health), Number(userPoint.wealth), Number(userPoint.luck));
  const outcome = pointSystem.getOutcome(riskLevel);
  console.log("Point system outcome", outcome);

  const points = pointSystem.getPoints();

  await redis.set(`user:${username}`, JSON.stringify(points));

  // Here ill have the generate options
  const result = await gameManager(scenario ? scenario : "", stat, riskLevel, username, useroption);
  if (result) return res.status(200).json({ result, points })
  else return res.status(500);
};

//Generate image using AI

const getImage = async (req: Request, res: Response) => {
  const { prompt } = req.body;
  try {
    const result = await generateImageFromPrompt(prompt);
    if (result) return res.json({ image: result });

  } catch (error: any) {
    console.error('Error generating image!', error);
    res.json({ image: "" });
  }
}

// Generat Random Text using AI

const getText = async (req: Request, res: Response) => {
  const { prompt } = req.body;
  try {
    const result = await generateTextFromPrompt(prompt);
    if (result) return res.json({ result });
  } catch (error: any) {
    console.error("Error generating text", error);
    throw error;
  };

}

export { story, getImage, getText };
