"use client";

import { SafeRecipe } from "@/app/types";
import { AiOutlineFieldTime, AiOutlineBulb } from "react-icons/ai";
interface RecipeTipsTricksProps {
  recipe: SafeRecipe;
}

const RecipeTipsTricks: React.FC<RecipeTipsTricksProps> = ({ recipe }) => {
  const totalTime = recipe.timeAdditional + recipe.timeCook + recipe.timePrep;

  function formatTime(time: number) {
    if (time < 60) {
      return time + " min";
    } else {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      return `${hours}:${minutes} hours`;
    }
  }

  return (
    <div className="flex flex-col gap-6 md:gap-10 cursor-default">
      {/* advertise */}
      <div className="bg-gray-100 flex md:hidden justify-center p-8 font-bold text-gray-400">
      A D V E R T I S E
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full gap-6 md:gap-10 px-4 md:px-0">
        <div className="flex flex-col gap-6 md:gap-10 justify-between w-full">
          {/* time */}
          <div className="flex flex-col gap-6 md:gap-10 w-full">
            <div className="flex flex-row font-bold text-lg items-center gap-2">
              <AiOutlineFieldTime size={40} className="fill-orange-500" />
              <p>Time</p>
            </div>
            <div className="flex flex-wrap justify-around items-center bg-orange-50 font-bold text-md text-center p-4 gap-10 md:gap-14">
              {[
                "Prep time",
                "Cooking time",
                "Additional time",
                "Total time",
                "Servings",
              ].map((label) => (
                <div key={label} className="flex flex-col">
                  <p>{label}</p>
                  <p className="text-gray-500">
                    {label === "Total time"
                      ? formatTime(totalTime)
                      : label === "Prep time"
                      ? formatTime(recipe.timePrep)
                      : label === "Cooking time"
                      ? formatTime(recipe.timeCook)
                      : label === "Additional time"
                      ? formatTime(recipe.timeAdditional)
                      : label === "Servings"
                      ? recipe.servings
                      : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* tips */}
          <div className="flex flex-col w-full">
            <div className="flex flex-row font-bold text-lg items-center gap-2 mb-6 md:mb-10">
              <AiOutlineBulb size={40} className="fill-orange-500" />
              <p>Tips, tricks and note</p>
            </div>
            {recipe.tipsTricks.length > 0 && (
              <div className="flex flex-col gap-4 md:gap-8">
                {recipe.tipsTricks.map((item, index) => (
                  <div key={index} className="flex px-4 md:px-8">
                    <div className="font-bold text-start mr-2">
                      {index + 1}&nbsp;-
                    </div>
                    <div className="flex md:flex-row flex-col w-full gap-4">
                      {/* @ts-ignore */}
                      <div className="text-justify">{item}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeTipsTricks;
