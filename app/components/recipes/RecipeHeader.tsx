"use client";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import { SafeRecipe, SafeUser } from "@/app/types";
import { FiYoutube } from "react-icons/fi";
import HeartButton from "../HeartButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import RatingRadio from "../RatingRadio";
import useRecipeModalUpdate from "@/app/hooks/useRecipeModalUpdate";
import useDeleteModal from "@/app/hooks/useDeleteModal";

interface RecipeHeaderProps {
  recipe: SafeRecipe;
  currentUser?: SafeUser | null;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({ recipe, currentUser }) => {
  const recipeModalUpdate = useRecipeModalUpdate();
  const recipeDelete = useDeleteModal();

  const formattedDate = new Date(recipe.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // @ts-ignore
  let ratingLength = recipe.reviews?.length;
  let ratingsString =
    ratingLength === 0
      ? " Be the first to rate this recipe!"
      : ratingLength === 1
      ? ratingLength + " Rating"
      : ratingLength + " Ratings";

  // @ts-ignore
  const countryFlag = "fi fi-" + recipe?.cuisine?.flag;

  const deleteRecipe = () => {
    recipeDelete.onOpen(recipe);
  };

  return (
    <div
      className="flex flex-col gap-4 cursor-default"
      id="top-of-recipe-page"
    >
      <div className="bg-gray-100 flex md:hidden justify-center p-8 font-bold text-gray-400">
      A D V E R T I S E
      </div>
      <div className="flex flex-row justify-between px-4 md:px-0">
        <div className="text-xl md:text-2xl lg:text-4xl font-bold text-orange-500">
          {recipe.name}
        </div>
        <div className="flex flex-row gap-2">
          {/* @ts-ignore */}
          <a href="#video">
            <FiYoutube color="#d0312d" size={33} />
          </a>
          <HeartButton
            size={33}
            recipeId={recipe.id}
            currentUser={currentUser}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between px-4 md:px-0">
        <div className="drop-shadow-sm flex flex-row flex-wrap text-sm md:text-md items-end pointer-events-none font-bold gap-2 md:gap-4">
          <RatingRadio viewOnly size={30} recipe={recipe} />
          <p>{ratingsString}</p>
        </div>
        {recipe.authorId === currentUser?.id && (
          <div className="flex flex-row gap-2 md:gap-4 items-end">
            <button
              onClick={() => recipeModalUpdate.onOpen(recipe)}
              className="bg-orange-500 hover:opacity-80 text-white font-semibold py-2 px-6 rounded-lg transition shadow-md"
            >
              Edit
            </button>
            <button
              onClick={() => deleteRecipe()}
              className="bg-red-600 hover:opacity-80 text-white font-semibold py-2 px-2 rounded-lg transition shadow-md"
            >
              <RiDeleteBin6Line size={22} />
            </button>
          </div>
        )}
      </div>

      
      <div className="flex flex-row justify-between flex-wrap mt-4 px-4 md:px-0">
        <div>
          <Image
            className="rounded-full mr-2"
            alt="User"
            height={40}
            width={40}
            // @ts-ignore
            src={recipe.author.image}
          />
        </div>
        <div>
          <div className="text-sm">
            {/* @ts-ignore */}
            Masterpiece by <span className="font-bold">{recipe.author.name}</span>
          </div>
          <div className="text-sm">Created at {formattedDate}</div>
        </div>
        <div className="flex flex-row self-end ml-auto mr-0 pt-2 font-bold text-gray-700 text-sm">
          {/* @ts-ignore */}
          <span className="hidden sm:block">{recipe.cuisine.value}&nbsp;</span>
          {/* @ts-ignore */}
          <span className={countryFlag}></span>
          <span>&nbsp;cuisine</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeHeader;