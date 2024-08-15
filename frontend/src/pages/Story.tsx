import React,{ useState, useEffect } from "react";
import {useLocation} from "react-router-dom";
import {http} from "../utils/axios.ts";

const dummyScenario = "In the mystical land of Eldoria, where magic and technology coexist, you, Arka, a renowned adventurer, are called upon to solve a mysterious series of occurrences. The first clue is a strange symbol found at the scene of the first incident. What do you do next?"
const dummyOptions = [
            "1. Confront High Priestess alone.",
            "2. Seek temple guidance with allies.",
            "3. Solve riddle at temple entrance."
]

const Story = () => {
  const {state} = useLocation(); 
  const {username} = state || {};
  
  const [gameData,setGameDate] = useState({
    scenario:"",
    options:[]
  });
  const [image,setImage] = useState("https://t3.ftcdn.net/jpg/05/74/59/94/360_F_574599444_KdhVklOr3PTUyMlq7079mbrFXyB0lFXf.jpg");
  const [getImage,setGetImage] = useState(true); // To handle do we need AI genererated images or not.

  const fetchImage = async (scenario:string) =>{
      try {
        const resImg = await http.post("http://localhost:8080/get-image", {
            prompt: `Create a colorful, imaginative drawing for the scenario "${scenario}" that has a comic-style vibe. The image should look playful and whimsical, with exaggerated features and vibrant colors. Avoid using any realistic objects; instead, focus on creating a fun, comic-inspired scene. #${Math.floor(Math.random() * 10000)}`
          }) 
        if(resImg.data.image) setImage(resImg.data.image);
        } catch (error) {
        console.error("Error fetching data."); 
      }
    }


    // fetch the starting story and the options
    const fetchStory = async(scenario:string, gamestat:"start"|"continue"|"end", username?:string ,useroption?: string) => {
      const response = await http.post("http://localhost:8080/story",{
        scenario,
        stat: gamestat,
        username,
        useroption,          
      });
      if(response) {
        setGameDate(response.data.result)
        if(getImage) // If user wants the AI generaeted images request here
        {
          setImage(fetchImage(gameData.scenario));
        }
      };
    };

  const handleNext = (e) =>
  {
    const useroption = e.target.value;
    fetchStory(gameData.scenario,"continue",username,useroption);
  }

  useEffect(()=>{      
    fetchStory("","start",username,"");
  },[])

  return <div className="flex flex-col items-center justify-center h-screen w-full">
      <img src={image}
           alt="scene image"
           className=""/>
      <p className="mt-8 text-lg text-center max-w-2xl px-4">
          {gameData.scenario}
      </p>
      <ul className="mt-6 space-y-4">
        {gameData.options.map((option,index)=><li key={index}>
            <button onClick={handleNext} value={option.replace(/^\d+\.\s*/,'')} className="w-full max-w-md px-6 py-3 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 focus:outline-none">
              {option.replace(/^\d+\.\s*/,'')}  
            </button>
          </li>)}
      </ul>
           {
        // First there will be the AI generated image of the scenarion.
        // The scenario .
        // Three options that user has to choose.
      }
  </div>
}

export default Story;
