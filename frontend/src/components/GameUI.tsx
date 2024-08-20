import React from "react";

// icons
import healthIcon from "../public/health.png";
import wealthIcon from "../public/wealth.png";
import luckIcon from "../public/luck.png";

// progress -- for indication bar
import { Progress } from '@chakra-ui/react'

interface IGameUI {
  points: {
    health: number;
    wealth: number;
    luck: number;

  }
}


const GameUI: React.FC<IGameUI> = (props) => {

  const { health, wealth, luck } = props.points;

  console.log(health, wealth, luck);
  return (
    <div className="flex justify-between my-10 p-6 bg-gray-800 rounded-lg shadow-lg">
      {/* Health */}
      <div className="flex items-center">
        <img className="me-4" src={healthIcon} height="30" width="30" alt="Health Icon" />
        <div className="flex flex-col">
          <span className="text-sm text-gray-400 mb-1">Health</span>
          <Progress w={200} value={health} className="bg-red-500" />
        </div>
      </div>

      {/* Wealth */}
      <div className="flex items-center">
        <img className="me-4" src={wealthIcon} height="30" width="30" alt="Wealth Icon" />
        <div className="flex flex-col">
          <span className="text-sm text-gray-400 mb-1">Wealth</span>
          <Progress w={200} value={wealth} className="bg-yellow-500" />
        </div>
      </div>

      {/* Luck Point */}
      <div className="flex items-center">
        <img className="me-4" src={luckIcon} height="30" width="30" alt="Luck Icon" />
        <div className="flex flex-col">
          <span className="text-sm text-gray-400 mb-1">Luck</span>
          <Progress w={200} value={luck} className="bg-green-500" />
        </div>
      </div>
    </div>
  );
}

export default GameUI;
