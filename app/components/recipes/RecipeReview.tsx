"use client";

import useReviewModal from "@/app/hooks/useReviewModal";
import { SafeRecipe, SafeReview, SafeUser } from "@/app/types";
import { useCallback } from "react";
import ReviewCard from "./ReviewCard";
import useLoginModal from "@/app/hooks/useLoginModal";
import { toast } from "react-hot-toast";
import { BsChatDots } from "react-icons/bs";

interface RecipeReviewProps {
  recipe: SafeRecipe;
  currentUser?: SafeUser | null | undefined;
  reviews?: SafeReview[] | null | undefined;
}

const RecipeReview: React.FC<RecipeReviewProps> = ({
  recipe,
  currentUser,
  reviews,
}) => {
  const reviewModal = useReviewModal();
  const loginModal = useLoginModal();

  const hasUserReviewed = reviews?.some(
    (review) => review.authorId === currentUser?.id && review.content
  );

  const hasUserRated = reviews?.some(
    (review) => review.authorId === currentUser?.id
  );

  const userReviewId = () => {
    if (reviews) {
      for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].authorId === currentUser?.id) {
          reviewModal.setReviewId(reviews[i].id);
          return true;
        }
      }
    }
    return false;
  };

  const openReviewModal = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    if (!userReviewId()) {
      toast("First rate it please!", { icon: "🍌🍌🍌🍌🍌" });
      return;
    }
    if (hasUserReviewed) {
      toast.error("You already reviewed this recipe!");
    } else {
      userReviewId();
      // @ts-ignore
      reviewModal.onOpen();
    }
  }, [currentUser, loginModal, reviewModal]);

  const contentCount = () => {
    let contentCount = 0;
    if (reviews && reviews.length > 0) {
      for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].content) {
          contentCount++;
        }
      }
    }
    return contentCount;
  };

  return (
    <div className="flex flex-col gap-6 md:gap-10 px-4 md:px-0">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row font-bold text-lg items-center gap-2">
          <BsChatDots size={40} className="fill-orange-500" />
          {contentCount() > 0 ? (
            <p>Reviews {contentCount()}</p>
          ) : (
            <div>
              <p>This recipe has no reviews yet!</p>
            </div>
          )}
        </div>
        {currentUser?.id !== recipe.authorId && (
          <button
            className="bg-orange-500 hover:opacity-80 text-white font-bold py-2 px-6 rounded-lg transition shadow-md"
            onClick={() => openReviewModal()}
          >
            Review
          </button>
        )}
      </div>
      {reviews?.map((review: SafeReview, i: number) => {
        if (review.content) {
          return (
            <div key={review.id} className="flex flex-col gap-4 md:gap-8">
              <ReviewCard
                recipe={recipe}
                currentUser={currentUser}
                review={review}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default RecipeReview;
