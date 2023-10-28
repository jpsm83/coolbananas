"use client";

import { SafeRecipe } from "@/app/types";
import { GiTrafficLightsReadyToGo } from "react-icons/gi";
interface RecipePreparationProps {
  recipe: SafeRecipe;
}

const RecipePreparation: React.FC<RecipePreparationProps> = ({ recipe }) => {
  return (
    <div className="flex flex-col gap-3 cursor-default">
      {/* advertise */}
      <div className="bg-gray-100 flex md:hidden justify-center p-8 font-bold text-gray-400">
      A D V E R T I S E
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full gap-4 px-4 md:px-0">
        <div className="flex flex-col gap-3 justify-between mt-4 w-full">
          {/* preparation */}
          <div className="flex flex-col w-full">
            <div className="flex flex-row font-bold text-lg items-center gap-2 mb-6 md:mb-10">
              <GiTrafficLightsReadyToGo size={40} className="fill-orange-500" />
              <p>Preparation</p>
            </div>
            {recipe.preparation.length > 0 && (
              <div className="flex flex-col gap-4 md:gap-8">
                {recipe.preparation.map((item, index) => (
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

export default RecipePreparation;