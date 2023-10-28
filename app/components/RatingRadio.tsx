"use client";

import { LuBanana } from "react-icons/lu";
import { useState, useEffect, useCallback } from "react";
import { SafeRecipe, SafeUser } from "@/app/types";
import useRating from "@/app/hooks/useRating";

interface RatingRadioProps {
  recipe: SafeRecipe;
  size: number;
  viewOnly?: boolean;
  currentUser?: SafeUser | null | undefined;
  reviewRated?: number | null | undefined;
}

const RatingRadio: React.FC<RatingRadioProps> = ({
  recipe,
  size,
  viewOnly,
  currentUser,
  reviewRated,
}) => {
  const { currentUserRating, rateClick } = useRating({
    recipe,
    currentUser,
  });
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  const currentUserRate = currentUserRating();

  const stars = Array(5).fill(0);

  let colorFullRatings = reviewRated
    ? reviewRated
    : viewOnly
    ? recipe.rateAvg
    : currentUserRate === 0
    ? 0
    : currentUserRate;

  const handleClick = async (value: number) => {
    if (!viewOnly) {
      // @ts-ignore
      await rateClick(value);
    }
    return null;
  };

  const handleMouseOver = (value: number) => {
    if (!viewOnly) {
      setHoverValue(value);
    }
    return null;
  };

  const handleMouseLeave = () => {
    if (!viewOnly) {
      setHoverValue(undefined);
    }
    return null;
  };

  return (
    <div className="flex flex-row">
      {stars.map((_, index) => {
        return (
          <LuBanana
            key={index}
            size={size}
            // @ts-ignore
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            color={
              // @ts-ignore
              (hoverValue || colorFullRatings) > index ? "#efb923" : "#e9e9e9"
            }
            style={{
              marginRight: 10,
              cursor: `${viewOnly ? "default" : "pointer"}`,
            }}
          />
        );
      })}
    </div>
  );
};

export default RatingRadio;