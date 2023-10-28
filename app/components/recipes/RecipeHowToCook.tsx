"use client";

import { SafeRecipe } from "@/app/types";
import { MdOutlineSoupKitchen } from "react-icons/md";
import { FaNutritionix } from 'react-icons/fa'
interface RecipeHowToCookProps {
  recipe: SafeRecipe;
}

const RecipeHowToCook: React.FC<RecipeHowToCookProps> = ({ recipe }) => {
  return (
    <div className="flex flex-col gap-6 md:gap-10 cursor-default">
      {/* advertise */}
      <div className="bg-gray-100 flex md:hidden justify-center p-8 font-bold text-gray-400">
      A D V E R T I S E
      </div>
    <div className="flex flex-col md:flex-row justify-between w-full gap-6 md:gap-10 px-4 md:px-0">
      <div className="flex flex-col gap-6 md:gap-10 justify-between w-full">
        {/* nutrition */}
        <div className="flex flex-col gap-6 md:gap-10 w-full">
          <div className="flex flex-row font-bold text-lg items-center gap-2">
            <FaNutritionix size={40} className="fill-orange-500" />
            <h2>Nutritional info per server</h2>
          </div>
          <div className="flex flex-wrap justify-around items-center bg-orange-50 font-bold text-md text-center p-4 gap-10 md:gap-14">
            {[
              "Carbs",
              "Sugar",
              "Protein",
              "Fat",
              "Fibre",
              "Kcal",
              "Salt",
              "Saturates",
            ].map((label) => (
              <div key={label} className="flex flex-col">
                <p>{label}</p>
                <p className="text-gray-500">
                  {label === "Fat"
                    ? (recipe.fat ? recipe.fat : '-')
                    : label === "Carbs"
                    ? (recipe.carbs ? recipe.carbs : '-')
                    : label === "Sugar"
                    ? (recipe.sugars ? recipe.sugars : '-')
                    : label === "Protein"
                    ? (recipe.protein ? recipe.protein : '-')
                    : label === "Fibre"
                    ? (recipe.fibre ? recipe.fibre : '-')
                    : label === "Kcal"
                    ? (recipe.kcal ? recipe.kcal : '-')
                    : label === "Salt"
                    ? (recipe.salt ? recipe.salt : '-')
                    : label === "Saturates"
                    ? (recipe.saturates ? recipe.saturates : '-')
                    : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* how to cook */}
        <div className="flex flex-col w-full">
          <div className="flex flex-row font-bold text-lg items-center gap-2 mb-6 md:mb-10">
            <MdOutlineSoupKitchen size={40} className="fill-orange-500" />
            <p>How to cook</p>
          </div>
          {recipe.howToCook.length > 0 && (
            <div className="flex flex-col gap-4 md:gap-8">
              {recipe.howToCook.map((item, index) => (
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

export default RecipeHowToCook;