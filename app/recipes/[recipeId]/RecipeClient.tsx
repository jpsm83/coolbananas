"use client";

import { SafeRecipe, SafeReport, SafeReview, SafeUser } from "@/app/types";
import Container from "@/app/components/Container";
import RecipeHeader from "@/app/components/recipes/RecipeHeader";
import RecipeDescription from "@/app/components/recipes/RecipeDescription";
import RecipeTipsTricks from "@/app/components/recipes/RecipeTipsTricks";
import RecipeIngredients from "@/app/components/recipes/RecipeIngredients";
import RecipePreparation from "@/app/components/recipes/RecipePreparation";
import RecipeHowToCook from "@/app/components/recipes/RecipeHowToCook";
import RecipeRatings from "@/app/components/recipes/RecipeRatings";
import ReportModal from "@/app/components/modals/ReportModal";
import ReviewModal from "@/app/components/modals/ReviewModal";
import RecipeReview from "@/app/components/recipes/RecipeReview";
import RecipeVideo from "@/app/components/recipes/RecipeVideo";
import RecipeSharing from "@/app/components/recipes/RecipeSharing";
import RecipeModalUpdate from "@/app/components/modals/RecipeModalUpdate";
import Logo from "@/app/components/navbar/Logo";

interface RecipeClientProps {
  recipe: SafeRecipe;
  currentUser?: SafeUser | null;
  reviews?: SafeReview[] | null | undefined;
  reports?: SafeReport[] | null | undefined;
}

const RecipeClient: React.FC<RecipeClientProps> = ({
  reports,
  recipe,
  currentUser,
  reviews,
}) => {

  return (
    <Container>
      <div id="top-of-recipe-page">
      <RecipeModalUpdate currentUser={currentUser} recipe={recipe} />
      <ReviewModal recipe={recipe} currentUser={currentUser} />
      <ReportModal recipe={recipe} />

      <div className="flex flex-col items-center md:flex-row md:items-start md:mt-8">
        <div className="fixed z-10 bg-white md:w-auto w-full border-b-[1px]">
          <RecipeSharing recipe={recipe}/>
        </div>
        <div className="flex flex-col pt-24 md:pt-0 md:pl-20">
          <RecipeHeader recipe={recipe} currentUser={currentUser} />
          <hr className="border-orange-500 my-10" />

          <div className="grid grid-cols-5 gap-10">
            <div className="flex-grow w-full col-span-5 md:col-span-3">
              <RecipeDescription recipe={recipe} />
              <hr className="border-orange-500 my-10" />
              <RecipeTipsTricks recipe={recipe} />
              <hr className="border-orange-500 my-10" />
              <RecipeIngredients recipe={recipe} />
              <hr className="border-orange-500 my-10" />
              <RecipePreparation recipe={recipe} />
              <hr className="border-orange-500 my-10" />
              <RecipeHowToCook recipe={recipe} />
              <hr className="border-orange-500 my-10" />
              {currentUser?.id !== recipe.authorId && (
                <div>
                  <RecipeRatings
                    recipe={recipe}
                    currentUser={currentUser}
                    reports={reports}
                  />
                  <hr className="border-orange-500 my-10" />
                </div>
              )}
              <RecipeReview
                recipe={recipe}
                currentUser={currentUser}
                reviews={reviews}
              />
              <hr className="border-orange-500 my-10" />
              <RecipeVideo recipe={recipe} currentUser={currentUser} />
            </div>
            <div className="bg-gray-100 hidden md:block md:col-span-2 md:mb-10">
            <div className="flex justify-center items-center h-40 md:h-full font-bold text-gray-400">A D V E R T I S E</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 md:gap-14 mb-6 md:mb-10">
        <Logo />
        <a
          href="#top-of-recipe-page"
          className="bg-orange-500 hover:opacity-80 text-white font-bold py-2 px-2 md:px-6 rounded-lg transition shadow-md"
        >
          Go top
        </a>
      </div>
      </div>
    </Container>
  );
};

export default RecipeClient;
