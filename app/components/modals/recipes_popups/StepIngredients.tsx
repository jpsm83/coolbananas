"use client";

import Heading from "../../Heading";
import IngredientsInput from "../../inputs/IngredientsInput";
import { SafeUser } from "@/app/types";

interface IngredientsProps {
  name: string;
  unit: string;
  quantity: number;
}

interface StepIngredientsProps {
  currentUser: SafeUser | null | undefined;
  ingredients: any[];
  isLoading: boolean;
  setCustomValue: (value: string, ingredient: any[]) => void;
}

const StepIngredients: React.FC<StepIngredientsProps> = ({
  ingredients,
  isLoading,
  currentUser,
  setCustomValue,
}) => {
  const handleIngredientSave = (ingredient: IngredientsProps) => {
    setCustomValue("ingredients", [...ingredients, ingredient]);
  };

  const handleDeleteIngredient = (index: number) => {
    setCustomValue(
      "ingredients",
      ingredients.filter((_: any, i: number) => i !== index)
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title={`Besides "unicorn spice", "mischievous smile dust" and "laughter-infused sauce" what else do we need ${currentUser?.name}`}
        subtitle="Write down the ingredients and their quantities."
      />
      <IngredientsInput
        id="ingredients"
        onSave={handleIngredientSave}
        disabled={isLoading}
      />
      <div className="flex flex-col max-h-[25vh] overflow-y-auto cursor-default">
        {ingredients.map((ingredient: any, index: number) => (
          <div
            key={index}
            className="
                flex
                flex-row
                justify-between
                gap-6
                w-full
                font-bold
                text-gray-600
                border-t-2
                py-2"
          >
            <div className="flex flex-row gap-4 text-justify">
              <p className="flex flex-wrap">{index + 1}-</p>
              <p>{ingredient.name}</p>
            </div>
            <div className="flex flex-row">
              <p>{ingredient.quantity}&nbsp;</p>
              <p>{ingredient.unit}</p>
              <button
                onClick={() => handleDeleteIngredient(index)}
                className="text-red-400 hover:text-red-800 w-6 flex items-end ml-2"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIngredients;
