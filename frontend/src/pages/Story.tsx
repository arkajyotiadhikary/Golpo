import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { http } from "../utils/axios.ts";
import Footer from '../layouts/Footer.tsx';
import GameUI from "../components/GameUI.tsx"

const Story = () => {
  const { state } = useLocation();
  const { username } = state || {};

  const riskLevel = ['high', 'mid', 'safe'] as const;

  const [gameData, setGameDate] = useState({
    scenario: "",
    options: [],
    points:{
      healht:100,
      wealth:10,
      luck:50,
    }
  });

  const [image, setImage] = useState("");
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
  const fetchStory = async (scenario: string,
    gamestat: "start" | "continue" | "end",
    riskLevel: 'high' | 'mid' | 'safe',
    username?: string, useroption?: string,
  ) => {
    console.log("Data sending", {
      scenario, username, useroption, riskLevel, gamestat
    })
    const response = await http.post("http://localhost:8080/story", {
      scenario: scenario,
      stat: gamestat,
      username: username,
      useroption: useroption,
      riskLevel: riskLevel
    });
    if (response) {
      setGameDate(response.data.result)
      if (getImage) // If user wants the AI generaeted images request here
      {
        await fetchImage(gameData.scenario);
      }
    };
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>, riskLevel: 'high' | 'mid' | 'safe') => {
    const useroption = e.currentTarget.value;
    console.log("Data to send for next scenario", {
      scenario: gameData.scenario,
      stat: "continue",
      username: username,
      useroption,
      riskLevel
    })
    fetchStory(gameData.scenario, "continue", riskLevel, username, useroption);
  }

  useEffect(() => {
    fetchStory('', 'start', 'safe', username, "");
  }, [])



  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center p-4">
          <div
            className="2xl:h-[800px] h-80 w-full rounded-md flex items-center justify-center bg-white shadow"
          >
            {image !== "" ? (
              <img
                src={image}
                alt="scene image"
                className="h-full w-full object-cover rounded-md"
              />
            ) : (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>

        {/* Options Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-4">
          <p className="text-lg text-gray-700 text-center md:text-left mb-6">
            {gameData.scenario}
          </p>
          <ul className="space-y-4">
            {gameData.options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={(e) => handleNext(e, riskLevel[index])}
                  value={option.replace(/^\d+\.\s*/, "")}
                  className="w-full px-6 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 focus:outline-none transition-colors duration-300"
                >
                  {option.replace(/^\d+\.\s*/, "")}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <GameUI points={gameData.points}/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Story;
