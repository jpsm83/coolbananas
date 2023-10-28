import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { SafeRecipe, SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseRating {
  recipe: SafeRecipe;
  currentUser?: SafeUser | null | undefined;
}

const useRating = ({ recipe, currentUser }: IUseRating) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const currentUserRating = () => {
    // @ts-ignore
    if (recipe.reviews) {
      // @ts-ignore
      for (let i = 0; i < recipe.reviews.length; i++) {
        // @ts-ignore
        if (recipe.reviews[i]?.authorId === currentUser?.id) {
          // @ts-ignore
          return recipe.reviews[i].ratingValue;
        }
      }
      return 0;
    }
  };

  const rateClick = async (ratingValue: number) => {
    if (!currentUser?.id) {
      return loginModal.onOpen();
    }
    try {
      // Find the index of the rating object with the current user's ID
      // @ts-ignore
      const userRatingIndex = recipe.reviews.findIndex(
        (rating: any) => rating.authorId === currentUser?.id
      );
      // Create a copy of the reviews array to avoid direct mutation
      if (userRatingIndex !== -1) {
        // @ts-ignore
        const recipeReview = recipe.reviews[userRatingIndex];
        let updatedRatings = {
          ratingValue: ratingValue,
        };
        // If the user has already rated, update their existing rating
        await axios.put(`/api/reviews/${recipeReview.id}`, updatedRatings);
        router.refresh();
        toast.success("Rating updated!");
      } else {
        const createReview = {
          ratingValue: ratingValue,
          recipeId: recipe.id,
        };
        await axios.post("/api/reviews/", createReview);
        router.refresh();
        toast.success("Rating created!");
      }
      await averageRecipeRate();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong.");
    }
  };
  
  const averageRecipeRate = async() => {
    const response = await axios.get(`/api/reviews?recipeId=${recipe.id}`);
    const allReviews = response.data;

    let rateAvg = 0;
    for (let i = 0; i < allReviews.length; i++) {
      rateAvg += allReviews[i].ratingValue;
    }
    const averageRating = rateAvg / allReviews.length;
    try {
      const updatedRecipeWithRateAvg = {
        rateAvg: averageRating,
      };
      await axios.put(`/api/recipes/${recipe.id}`, updatedRecipeWithRateAvg);
      router.refresh();
    } catch (error) {
      console.error("Update rateAvg error:", error);
    }
  }

  return { currentUserRating, rateClick, averageRecipeRate };
};
export default useRating;