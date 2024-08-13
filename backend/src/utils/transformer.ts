/*  Transformer.ts   */


/* 
 * ## TODO ##
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
      options?: string[];
}

const hfChatCompletion = async(content:string) => {
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

export const generateImageFromPrompt = async(prompt:string)=> {
  console.log(`Generatng image for the prompt ${prompt}`)
  const out = await hf.textToImage({
    model: 'prompthero/openjourney-v4',
    inputs:prompt,
    parameters: {
      negative_prompt: 'easynegative',
    } 
  });
  if(out){
    const buffer = Buffer.from(await out.arrayBuffer());
    const base64Image = `data:${out.type};base64,${buffer.toString('base64')}`;
    return base64Image;
  } 

  return;
}

//Generate normal text for the websites here and there usage

export const generateTextFromPrompt = async(prompt:string) =>{
  console.log("Generating text from prompt");
  try{
    const out = await hfChatCompletion(prompt);
    const result = out.choices[0].message.content?.trim();
    if(result) return result;
    return;
  }catch(error:any){
    console.error("Error generating ")
  }

}
// Method to generate continue prompt.
const generateContinuePrompt = (scenario:string,option:string) => {
	return `The scenario was ${scenario} and user has choose the option ${option}. Generate the next scenario in json formate.`
}

// Method to formate a output to json.
const formateStringToJSON = (text:string)=>{
  try{
    const stringObj = JSON.parse(text);
    return stringObj;
  }catch(error:any)
  {
    console.error("Error converting string to json",error);
  }
}

// Using hf inference chat compeletion to generate options

export const generateOptionsHfInference = async (
      scenerio: string
): Promise<Scenario | undefined> => {
      console.log("Generating options using Hf Inference");
      try {
            const out = await hfChatCompletion(scenerio);
            const options = out.choices[0].message.content?.trim().replace('"\"',"").split("\n");
            console.log(out.choices[0].message);

            if (options)
                  return {
                        description: scenerio,
                        options,
                  };
            else {
                  console.log("No options found");
                  return;
            }
      } catch (error: any) {
            console.error("Error generating options", error);
      }
};

// Inputs prev scenario and user option

export const generateScenarioHfInference = async(prevScenario:string, userOption:string): Promise<Scenario|undefined> => {
	console.log("Generating scenario from option and prev scenario");
	try{
		const prompt = generateContinuePrompt(prevScenario, userOption);
		const out = await hfChatCompletion(prompt);
		const scenario = out.choices[0].message.content?.trim();

		console.log("Generated continue scenario is: ",scenario);

		if(scenario)
			return {
				description: formateStringToJSON(scenario),
			};
		else {
			console.log("No scenario has been generated!!");
			return;
		}
			
	}catch(error:any){
		console.error("Error generating scenarios");
		throw error;
			  
	}
	
}







