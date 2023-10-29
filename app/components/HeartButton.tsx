"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";

interface HeartButtonProps {
  recipeId: string;
  currentUser?: SafeUser | null;
  size: number;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  recipeId,
  size,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    recipeId,
    size,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={size}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={0.85 * size}
        className={hasFavorited ? "fill-orange-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
