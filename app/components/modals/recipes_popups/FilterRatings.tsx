import React, { useState } from "react";
import { LuBanana } from "react-icons/lu";

interface FilterRatingsProps {
  ratings: number;
  setCustomValue: (value: string, type: string | number | undefined) => void;
}

const FilterRatings: React.FC<FilterRatingsProps> = ({
  ratings,
  setCustomValue,
}) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  const stars = Array(5).fill(0);

  const handleClick = (valueCategory: string, selectedRating: number) => {
    setCustomValue(valueCategory, selectedRating);
  };

  const handleMouseOver = (value: number) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div className="flex flex-row justify-center">
      {stars.map((_, index) => {
        return (
          <LuBanana
            key={index}
            size={50}
            onClick={() => handleClick("ratings", index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            color={(hoverValue || ratings) > index ? "#efb923" : "#e9e9e9"}
          />
        );
      })}
    </div>
  );
};

export default FilterRatings;
