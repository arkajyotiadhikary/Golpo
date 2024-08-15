import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { http } from "../utils/axios.ts";

const dummyScenario = "In the mystical land of Eldoria, where magic and technology coexist, you, Arka, a renowned adventurer, are called upon to solve a mysterious series of occurrences. The first clue is a strange symbol found at the scene of the first incident. What do you do next?"
const dummyOptions = [
  "1. Confront High Priestess alone.",
  "2. Seek temple guidance with allies.",
  "3. Solve riddle at temple entrance."
]

const Story = () => {
  const { state } = useLocation();
  const { username } = state || {};

  const [gameData, setGameDate] = useState({
    scenario: "",
    options: []
  });
  const [image, setImage] = useState("https://t3.ftcdn.net/jpg/05/74/59/94/360_F_574599444_KdhVklOr3PTUyMlq7079mbrFXyB0lFXf.jpg");
  const [getImage, setGetImage] = useState(true); // To handle do we need AI genererated images or not.

  const fetchImage = async (scenario: string) => {
    try {
      const resImg = await http.post("http://localhost:8080/get-image", {
        prompt: `Create a colorful, imaginative drawing for the scenario "${scenario}" with a comic-style and Zelda-inspired vibe. The image should be vibrant and whimsical, incorporating elements typical of a comic book and the artistic style found in the Zelda series. Avoid using realistic objects; instead, focus on creating a dynamic, fantasy-inspired scene. #${Math.floor(Math.random() * 10000)}`
      })
      if (resImg.data.image) setImage(resImg.data.image);
    } catch (error) {
      console.error("Error fetching data.");
    }
  }


  // fetch the starting story and the options
  const fetchStory = async (scenario: string, gamestat: "start" | "continue" | "end", username?: string, useroption?: string) => {
    const response = await http.post("http://localhost:8080/story", {
      scenario,
      stat: gamestat,
      username,
      useroption,
    });
    if (response) {
      setGameDate(response.data.result)
      if (getImage) // If user wants the AI generaeted images request here
      {
        setImage(fetchImage(gameData.scenario));
      }
    };
  };

  const handleNext = (e) => {
    const useroption = e.target.value;
    fetchStory(gameData.scenario, "continue", username, useroption);
  }

  useEffect(() => {
    fetchStory("", "start", username, "");
  }, [])



  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-full md:w-1/2 flex justify-center p-4">
        <img
          src={image}
          alt="scene image"
          className="2xl:h-[800px] h-80 rounded-md"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center p-4">
        <p className="text-lg text-gray-700 text-center md:text-left mb-6">
          {gameData.scenario}
        </p>
        <ul className="space-y-4">
          {gameData.options.map((option, index) => (
            <li key={index}>
              <button
                onClick={handleNext}
                value={option.replace(/^\d+\.\s*/, '')}
                className="w-full px-6 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 focus:outline-none transition-colors duration-300"
              >
                {option.replace(/^\d+\.\s*/, '')}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Story;
