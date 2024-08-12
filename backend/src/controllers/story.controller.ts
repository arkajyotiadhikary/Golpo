import { Request, Response } from "express";
import { generateOptionsHfInference, generateScenarioHfInference, generateImageFromPrompt } from "../utils/transformer.js";

/*
 * start the story using this function
 * take input username from the user
 * have a const prompt to form the startig prompt
 */


const gameManager = async(scenario:string, gamestat:"start"|"continue"|"end", username?:string ,useroption?: string) => {
	
	console.log("Running game manager");

	switch(gamestat){
		case "start":{
			console.log("Game has been started");

			const prompt = `Scenario: "${scenario}"\nGenerate three possible actions the character could take:\n1. Most dengerous:\n2. Medium danger:\n3. Safest:. In one sentence.`;
			try{
				const options = await generateOptionsHfInference(prompt);
				if(options) return options;
			}catch(error:any){
				console.error("Error generating starting options");
				throw error;
			}
		}
		case "continue":{
			//TODO create a prompt with prev scenario and user option
			//insead of sending description from utins/transformer send it from here
			//using ai generate the next scenerio and the options
			try{
				const nextScenario = await generateScenarioHfInference(scenario,useroption!);
				if(nextScenario) return nextScenario;
			}catch(error:any){
				console.log("Error generating scenario",error);
				throw error;
			}
		}
		case "end":{
			return;
		}
		default:
		{
			return;
		}
	}	
}

const story = async (req: Request, res: Response) => {
      	const { username, stat, scenario, useroption } = req.body;
	console.log("Data recived: ", username, stat, scenario, useroption);
	const prePrompt = `In the mystical land of Eldoria, where magic and technology coexist, you, ${username}, a renowned adventurer, are called upon to solve a mysterious series of occurrences. The first clue is a strange symbol found at the scene of the first incident. What do you do next?`;


      // Here ill have the generate options
      const result = await gameManager(scenario?scenario:prePrompt, stat, username, useroption);
      if(result) return res.status(200).json({result})
      else return res.status(500);

};

//Generate image using AI

const getImage = async(req:Request,res:Response)=>{
  const {prompt} = req.body;
  try{
    const result = await generateImageFromPrompt(prompt);
    console.log("image result ",result);
    if(result)return res.json({image:result});

  }catch(error:any){
    console.error('Error generating image!',error);
    throw error;
  }
}

export { story, getImage };
