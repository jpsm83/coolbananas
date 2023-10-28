"use client";

import { SafeRecipe, SafeReview, SafeUser } from "@/app/types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ReplyCardProps {
  currentUser?: SafeUser | null | undefined;
  review: SafeReview | null | undefined;
  recipe: SafeRecipe;
}

const ReplyCard: React.FC<ReplyCardProps> = ({
  currentUser,
  review,
  recipe,
}) => {
  const router = useRouter();

  const deleteReply = useCallback(() => {
    if (currentUser?.id === recipe.authorId) {
      try {
        const data = {reply: null}
        axios.put(`/api/reviews/${review?.id}`, data).then(() => {
          toast.success("Reply deleted!");
          router.refresh();
        });
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
      } finally {
      }
    }
  }, [router, review, recipe, currentUser]);

  return (
    <div className="bg-gray-100 pl-20">
      <div className="p-4 md:p-8 bg-white text-justify">{review?.reply}</div>
      {recipe.authorId === currentUser?.id && (
        <div
          onClick={() => {
            deleteReply();
          }}
          className="hover:cursor-pointer flex justify-end mt-4 md:mt-8"
        >
          <RiDeleteBin6Line
            size={18}
            className="text-red-700 hover:text-red-500"
          />
        </div>
      )}
    </div>
  );
};

export default ReplyCard;
