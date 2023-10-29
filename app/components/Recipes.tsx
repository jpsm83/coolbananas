"use client";

import Container from "../components/Container";
import RecipeCard from "./recipes/RecipeCard";
import { SafeRecipe, SafeUser } from "../types";

interface RecipesProps {
  recipes?: SafeRecipe[] | null | undefined;
  currentUser: SafeUser;
}

const Recipes: React.FC<RecipesProps> = ({ recipes, currentUser }) => {
  const renderedRecipes = [];

  // Insert the first advertisement card
  // @ts-ignore
  if (recipes?.length > 0) {
    renderedRecipes.push(
      <div className="bg-gray-100" key="advertise0">
        <div className="flex justify-center items-center h-40 md:h-full font-bold text-gray-400">
          A D V E R T I S I N G{" "}
        </div>
      </div>
    );
  }

  // @ts-ignore
  for (let i = 0; i < recipes.length; i++) {
    // @ts-ignore
    if (recipes[i]) {
      renderedRecipes.push(
        <RecipeCard
          currentUser={currentUser}
          // @ts-ignore
          key={recipes[i].id}
          // @ts-ignore
          recipe={recipes[i]}
        />
      );
    }
    // Insert an advertisement card after every 3 recipe cards
    if ((i + 1) % 4 === 0) {
      renderedRecipes.push(
        <div className="bg-gray-100" key={`advertise${i}`}>
          <div className="flex justify-center items-center h-40 md:h-full font-bold text-gray-400">
            A D V E R T I S I N G{" "}
          </div>
        </div>
      );
    }
  }

  return (
    <Container>
      <div>
        <div
          className="
          align-middle
          z-10
          py-6
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:grid-cols-5
          gap-8
        "
        >
          {renderedRecipes}
        </div>
      </div>
    </Container>
  );
};

export default Recipes;
