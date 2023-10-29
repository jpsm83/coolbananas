"use client";

import { SafeRecipe } from "@/app/types";
import { BsSun, BsSnow3, BsFillCalendarHeartFill } from "react-icons/bs"; // summer, winter, events
import { GiFallingLeaf } from "react-icons/gi"; // autumm
import { PiFlowerTulip } from "react-icons/pi"; // spring
import { BiFoodMenu } from "react-icons/bi"; // recipe type
import { AiOutlineApple, AiOutlineCalendar } from "react-icons/ai"; //diet - season
import { FaKitchenSet } from "react-icons/fa6"; // method
import { LiaAllergiesSolid } from "react-icons/lia"; // allergens
import { ImageSlider } from "../ImageSlider";

interface RecipeDescriptionProps {
  recipe: SafeRecipe | any;
}

const RecipeDescription: React.FC<RecipeDescriptionProps> = ({ recipe }) => {
  const testing = (category: string) => {
    let title;
    let description;
    let icon;

    switch (category) {
      case "type":
        title = "Courses & types";
        description = "This is a great choice for ";
        icon = <BiFoodMenu size={40} className="fill-orange-500" />;
        break;
      case "diet":
        title = "Diets";
        description = "Best for diets like ";
        icon = <AiOutlineApple size={40} className="fill-orange-500" />;
        break;
      case "season":
        title = "Season";
        description = "Better during ";
        icon = <AiOutlineCalendar size={40} className="fill-orange-500" />;
        break;
      case "method":
        title = "Methods";
        description =
          "Some of the methods and kitchen appliances we are going to use are ";
        icon = <FaKitchenSet size={40} className="fill-orange-500" />;
        break;
      case "allergens":
        title = "Allergens";
        description = "Not suitable for people with allergies on ";
        icon = <LiaAllergiesSolid size={40} className="fill-red-500" />;
        break;
      case "events":
        title = "Events";
        description = "Great choice for ";
        icon = (
          <BsFillCalendarHeartFill size={40} className="fill-orange-500" />
        );
        break;
      default:
        break;
    }

    return (
      <div
        className={`drop-shadow-md min-h-300 flex flex-col p-4 justify-center items-center ${
          category === "allergens" ? "bg-gray-100" : "bg-orange-50"
        }`}
      >
        <div
          className={`flex flex-row flex-wrap justify-center gap-1 items-center mb-3 ${
            category === "allergens" && "text-red-500"
          }`}
        >
          {icon}
        </div>
        <div
          className={`font-bold text-lg mb-6 ${
            category === "allergens" && "text-red-500"
          }`}
        >
          {title}
        </div>
        {recipe[category].length > 0 ? (
          <div>
            <div className="flex flex-row flex-wrap justify-center text-center">
              <span>{description}&nbsp;</span>
              {recipe[category].map((item: string, i: number) => (
                <span
                  key={i}
                  className={`font-bold ${
                    category === "allergens" && "text-red-500"
                  }`}
                >
                  {item}
                  {i === recipe[category].length - 1 ? "." : ""}
                  {i === recipe[category].length - 2 ? " and " : ""}
                  {i < recipe[category].length - 2 ? ", " : ""}
                  &nbsp;
                </span>
              ))}
            </div>
            {category === "season" && (
              <div className="flex flex-row gap-4 mt-4 flex-wrap justify-center">
                <PiFlowerTulip
                  size={40}
                  color={
                    recipe.season.includes("Spring") ? "#efb923" : "#d9d9d9"
                  }
                />
                <BsSun
                  size={40}
                  color={
                    recipe.season.includes("Summer") ? "#efb923" : "#d9d9d9"
                  }
                />
                <GiFallingLeaf
                  size={40}
                  color={
                    recipe.season.includes("Autumn") ? "#efb923" : "#d9d9d9"
                  }
                />
                <BsSnow3
                  size={40}
                  color={
                    recipe.season.includes("Winter") ? "#efb923" : "#d9d9d9"
                  }
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            {category === "allergens" ? (
              <>
                This recipe has no allergens display.&nbsp;
                <p className="font-bold text-red-500 mt-4">
                  BE CAREFUL IF YOU HAVE ANY ALLERGY
                </p>
              </>
            ) : category === "events" ? (
              <div className="text-center">
                This recipe is suitable for any occasions.
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col cursor-default">
      <div className="font-bold text-lg mb-8 text-justify px-4 md:px-0">
        {recipe.description}
      </div>
      <div className="flex justify-center overflow-hidden w-600 h-400">
        <ImageSlider recipeImages={recipe.imageSrc} />
      </div>
      <hr className="border-orange-500 my-10" />
      <div
        className="
            grid 
            grid-cols-1 
            sm:grid-cols-2
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
            md:gap-10
            px-4 md:px-0
"
      >
        {testing("type")}
        {testing("diet")}
        {testing("season")}
        {testing("method")}
        {testing("allergens")}
        {testing("events")}
      </div>
    </div>
  );
};
export default RecipeDescription;
