"use client";

import { SafeRecipe, SafeReview, SafeUser } from "@/app/types";
import Image from "next/image";
import RatingRadio from "../RatingRadio";
import { useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineThumbUp } from "react-icons/hi";
import useLoginModal from "@/app/hooks/useLoginModal";
import useReplyModal from "@/app/hooks/useReplyModal";
import ReplyModal from "../modals/ReplyModal";
import ReplyCard from "./ReplyCard";
import useRating from "@/app/hooks/useRating";

interface ReviewCardProps {
  recipe: SafeRecipe;
  currentUser?: SafeUser | null | undefined;
  review?: SafeReview | null | undefined;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  recipe,
  currentUser,
  review,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const replyModal = useReplyModal();
  const { averageRecipeRate } = useRating({
    recipe,
    currentUser,
  });

  const openReplyModal = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    if (currentUser.id === recipe.authorId && review?.reply === null) {
      replyModal.onOpen(review);
    }
  }, [currentUser, recipe, loginModal, replyModal, review]);

  // @ts-ignore
  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const addLike = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let updatedReview;
      let messageLike = "";

      if (!review?.likedIds.find((user) => user === currentUser.id)) {
        // Create a copy of the review and update the properties for adding a like
        updatedReview = {
          likes: (review?.likes || 0) + 1,
          likedIds: [...(review?.likedIds || []), currentUser.id],
        };
        messageLike = "You liked this review";
      } else {
        // Create a copy of the review and update the properties for removing a like
        updatedReview = {
          likes: (review.likes || 0) - 1,
          likedIds: (review.likedIds || []).filter(
            (user) => user !== currentUser.id
          ),
        };
        messageLike = "You disliked this review";
      }

      // Make the update request for the review (assuming the endpoint is correct)
      const response = await axios.put(
        `/api/reviews/${review?.id}`,
        updatedReview
      );

      if (response.status === 200) {
        // Assuming a successful update status code
        router.refresh();
        toast.success(messageLike);
      } else {
        toast.error("Failed to update review.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong.");
    }
  };

  const deleteReview = useCallback(async () => {
    if (currentUser && review && currentUser.id === review.authorId) {
      try {
        await axios.delete(`/api/reviews/${review.id}`);
        toast.success("Review deleted!");
        await averageRecipeRate();
        router.refresh();
      } catch (error) {
        console.error("Error deleting review:", error);
        toast.error("Something went wrong while deleting the review.");
      }
    } else {
      console.warn("Cannot delete review: currentUser or review is invalid.");
    }
  }, [router, review, currentUser]);

  return (
    <div className="bg-gray-100 p-4 md:p-8">
      <ReplyModal recipe={recipe} currentUser={currentUser} />
      <div className="flex flex-row justify-between flex-wrap">
        <div className="flex flex-col gap-2 justify-between cursor-default">
          <div className="flex flex-row items-end flex-wrap">
            <div>
              <Image
                className="rounded-full mr-2"
                alt="User"
                height={40}
                width={40}
                // @ts-ignore
                src={review?.author?.image}
              />
            </div>
            <div>
              <div className="text-sm">
                Reviewed by {/* @ts-ignore */}
                <span className="font-bold">{review?.author?.name}</span>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-row items-end text-gray-500 ${
              review?.authorId === currentUser?.id ? "" : "pointer-events-none"
            }`}
          >
            <RatingRadio
              size={20}
              recipe={recipe}
              currentUser={currentUser}
              reviewRated={review?.ratingValue}
            />
          </div>
        </div>
        {/* @ts-ignore */}
        {review.authorId === currentUser?.id && (
          <div
            onClick={() => {
              deleteReview();
            }}
            className="hover:cursor-pointer"
          >
            <RiDeleteBin6Line
              size={18}
              className="text-red-700 hover:text-red-500"
            />
          </div>
        )}
      </div>
      <div className="p-4 md:p-8 ml-4 md:ml-8 mt-4 md:mt-8 bg-white text-justify">
        {review?.content}
      </div>
      <div className="text-xs mt-2 md:mt-4 flex flex-row justify-end">
        Created at {formattedDate}
      </div>

      <div className="flex flex-row flex-wrap items-center justify-between mt-2 md:mt-0 ml-6">
        <div className="flex flex-row items-end">
          <button onClick={() => addLike()}>
            <HiOutlineThumbUp size={24} className="text-green-700 mr-1" />
          </button>

          <p className="text-gray-500 font-bold text-sm mr-4 md:mr-8 cursor-default">
            {review?.likes}
          </p>
          {recipe.authorId === currentUser?.id && review?.reply === null && (
            <button
              onClick={() => openReplyModal()}
              className="text-red-700 hover:text-red-500 font-bold hover:underline underline-offset-4"
            >
              Reply
            </button>
          )}
        </div>
      </div>
      <div className="bg-white">
        {review?.reply && (
          <div key={review.id}>
            <ReplyCard
              currentUser={currentUser}
              recipe={recipe}
              review={review}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
