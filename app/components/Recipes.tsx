"use client";

import Container from "../components/Container";
import RecipeCard from "./recipes/RecipeCard";
import { SafeRecipe, SafeUser } from "../types";
import useSubscriberModal from "../hooks/useSubscriberModal";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface RecipesProps {
  recipes?: SafeRecipe[] | null | undefined;
  currentUser: SafeUser;
}

const Recipes: React.FC<RecipesProps> = ({ recipes, currentUser }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const renderedRecipes = [];
  const subscriberModal = useSubscriberModal();
  const { data: session } = useSession();

  const userEmail = session?.user?.email;

  const userIsSubscribed = async () => {
    try {
      const response = await axios.get("/api/subscribers");
      setIsSubscribed(response.data.includes(userEmail));
    } catch (error) {
      console.error(error);
      setIsSubscribed(false);
    }
  };

  useEffect(() => {
    userIsSubscribed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

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
      <button
        className={`fixed border-white border bottom-0 right-0 mb-8 mr-8 shadow-md transform transition-transform duration-300 hover:scale-110 animate-heartbeat bg-orange-500 text-white py-2 px-4 rounded ${
          isSubscribed ? "hidden" : ""
        }`}
        onClick={() => subscriberModal.onOpen()}
      >
        Subscribe ❤️
      </button>
    </Container>
  );
};

export default Recipes;
