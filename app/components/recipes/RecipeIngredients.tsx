"use client";

import { SafeRecipe } from "@/app/types";
import { GiFruitBowl } from "react-icons/gi";
interface RecipeIngredientsProps {
  recipe: SafeRecipe;
}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({ recipe }) => {
  return (
    <div className="flex flex-col gap-6 md:gap-10 cursor-default">
      {/* advertise */}
      <div className="bg-gray-100 flex md:hidden justify-center p-8 font-bold text-gray-400">
      A D V E R T I S E
      </div>
      {/* ingredients */}
      <div className="flex flex-col w-full px-4 md:px-0">
        <div className="flex flex-row font-bold text-lg items-center gap-2 mb-6 md:mb-10">
          <GiFruitBowl size={40} className="fill-orange-500" />
          <p>Ingredients</p>
        </div>
        {recipe.ingredients.length > 0 && (
          <div className="flex flex-col gap-4 md:gap-8">
            {recipe.ingredients.map((item, index) => (
              <div key={index} className="flex px-4 md:px-8">
                <div className="font-bold text-start mr-2">
                  {/* @ts-ignore */}
                  {item.quantity}&nbsp;-{item.unit}&nbsp;
                  <span className="font-normal border-b-2">
                    {/* @ts-ignore */}
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeIngredients;
