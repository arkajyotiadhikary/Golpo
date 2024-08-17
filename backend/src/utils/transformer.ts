import dotenv from "dotenv";
dotenv.config();

// Using hugging face inference
import { HfInference } from "@huggingface/inference";
// Prompts
import { generateContinuePrompt, generateOptionPrompt } from "./prompts.js";

const token = process.env.HUGGING_FACE_TOKEN;
console.log("Loaded hf token: ", token);

// Hf initialz
const hf = new HfInference(token);


const hfChatCompletion = async (content: string) => {
  return await hf.chatCompletion({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [{ role: "user", content }],
    temperature: 0.7,
    max_tokens: 500,
    top_p: 0.95,
    top_k: 50,
  })
};

// Generate continue prompt
// TODO: add risk of death losing point and etc... (Brainstorm about it later)

export const generateImageFromPrompt = async (prompt: string) => {
  console.log(`Generatng image for the prompt ${prompt}`)
  const out = await hf.textToImage({
    model: 'prompthero/openjourney-v4',
    inputs: prompt,
    parameters: {
      negative_prompt: 'easynegative',
    }
  });
  if (out) {
    const buffer = Buffer.from(await out.arrayBuffer());
    const base64Image = `data:${out.type};base64,${buffer.toString('base64')}`;
    return base64Image;
  }

  return "";
}

// Generate normal text for the websites here and there usage
export const generateTextFromPrompt = async (prompt: string) => {
  console.log("Generating text from prompt");
  try {
    const out = await hfChatCompletion(prompt);
    const result = out.choices[0].message.content?.trim();
    if (result) return result;
    return;
  } catch (error: any) {
    console.error("Error generating ")
  }
}

// Using hf inference chat compeletion to generate options
export const generateOptionsHfInference = async (
  scenario: string
) => {
  console.log("Generating options using Hf Inference");
  try {
    const prompt = generateOptionPrompt(scenario);
    const out = await hfChatCompletion(prompt);
    const options = out.choices[0].message.content?.trim().replace('"\"', "").split("\n");
    console.log(out.choices[0].message);

    if (options)
      return options;
    else {
      console.log("No options found");
      return;
    }
  } catch (error: any) {
    console.error("Error generating options", error);
  }
};

// Inputs prev scenario and user option
export const generateScenarioHfInference = async (prevScenario: string, userOption: string, riskLevel: string) => {
  console.log("Generating scenario from option and prev scenario");
  try {
    const prompt = generateContinuePrompt(prevScenario, userOption, riskLevel);
    const out = await hfChatCompletion(prompt);
    const scenario = out.choices[0].message.content?.trim();

    console.log("Generated continue scenario is: ", scenario);

    if (scenario) {
      //Generate options for the scenario 
      const options = await generateOptionsHfInference(scenario);
      if (options)
        return scenario;
      else return;
    }
    else {
      console.log("No scenario has been generated!!");
      return;
    }

  } catch (error: any) {
    console.error("Error generating scenarios");
    throw error;

  }
}







