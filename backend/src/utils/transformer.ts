/*
 *  ## TODO ##
 * Trying out HfInference
 * Hugging face API didnt worked.
 */
import dotenv from "dotenv";
dotenv.config();

// Using hugging face inference
import { HfInference } from "@huggingface/inference";
import { error } from "console";

const token = process.env.HUGGING_FACE_TOKEN;
console.log("Loaded hf token: ", token);

// Hf initialz
const hf = new HfInference(token);

interface Scenario {
      description: string;
      options: string[];
}

// Using hf inference chat compeletion to generate options
export const generateOptionsHfInference = async (
      scenerio: string
): Promise<Scenario | undefined> => {
      console.log("Generating options using Hf Inference");
      try {
            const out = await hf.chatCompletion({
                  model: "mistralai/Mistral-7B-Instruct-v0.2",
                  messages: [{ role: "user", content: scenerio }],
                  temperature: 0.7,
                  max_tokens: 150,
                  top_p: 0.95,
                  top_k: 50,
            });

            const options = out.choices[0].message.content?.trim().split("\n");

            console.log(out.choices[0].message);
            if (options)
                  return {
                        description: scenerio,
                        options,
                  };
            else {
                  console.log("No options found");
                  throw error;
            }
      } catch (error: any) {
            console.error("Error generating options", error);
      }
};
