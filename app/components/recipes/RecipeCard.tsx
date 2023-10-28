"use client";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiOutlineFieldTime, AiOutlineStar } from "react-icons/ai";
import useCountries from "@/app/hooks/useCountries";
import { SafeRecipe, SafeUser } from "@/app/types";
import HeartButton from "../HeartButton";
import Button from "../Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import RatingRadio from "../RatingRadio";
import { useCallback, useState } from "react";
import useRecipeModalUpdate from "@/app/hooks/useRecipeModalUpdate";
import useDeleteModal from "@/app/hooks/useDeleteModal";

interface RecipeCardProps {
  recipe: SafeRecipe;
  currentUser?: SafeUser | null;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, currentUser }) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const recipeModalUpdate = useRecipeModalUpdate();
  const recipeDelete = useDeleteModal();

  let totalTime = recipe.timePrep + recipe.timeCook + recipe.timeAdditional;
  let timeString;

  if (totalTime > 60) {
    timeString = `Ready in ${Math.floor(totalTime / 60)}:${
      totalTime % 60
    } hours`;
  } else {
    timeString = `Ready in ${totalTime} minutes`;
  }
  //@ts-ignore
  const country = getByValue(recipe.cuisine.cca2);
  //@ts-ignore
  const countryFlag = "fi fi-" + country.flag;

  const deleteRecipe = () => {
    recipeDelete.onOpen(recipe);
  };

  const updateRecipe = () => {
    router.push(`/recipes/${recipe.id}`);
    recipeModalUpdate.onOpen(recipe);
  };

  return (
    <div className="shadow-sm flex flex-col justify-between cursor-pointer z-0">
      <div className="flex flex-col h-full justify-between">
        <div
          className="
            aspect-[4/3] 
            relative 
            overflow-hidden
          "
          onClick={() => router.push(`/recipes/${recipe.id}`)}
        >
          <Image
            src={recipe.imageSrc[0]}
            alt="Recipe"
            width={600}
            height={600}
            objectPosition="center"
            className="
              h-full w-full
                hover:scale-110 
                transition
                absolute
              "
            style={{
              objectFit: "cover",
            }}
          />
          <div
            className="
            absolute
            top-3
            right-3
          "
          >
            <HeartButton
              size={28}
              recipeId={recipe.id}
              currentUser={currentUser}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-1 flex items-center justify-between bg-gray-900/40">
            <div className="flex items-center gap-3">
              <span className={countryFlag}></span>
              <div className="font-bold text-white whitespace-nowrap overflow-hidden">{country?.value}</div>
            </div>
          </div>
        </div>

        <div className="p-2 flex flex-col items-center h-[104px] justify-between">
          <div className="font-semibold text-lg">{recipe.name}</div>
          {currentUser?.id === recipe.authorId ? (
            <div
              className="
            flex 
            flex-row 
            items-center 
            gap-4
            w-full
          "
            >
              <Button small label={"Edit"} onClick={() => updateRecipe()} />
              <Button small label={"Delete"} onClick={() => deleteRecipe()} />
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex flex-row my-2 pointer-events-none">
                <RatingRadio recipe={recipe} size={20} viewOnly />
              </div>
              <div className="flex flex-row font-light text-neutral-500">
                {timeString}&nbsp;
                <AiOutlineFieldTime size={18} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;