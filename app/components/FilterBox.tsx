"use client";

import { IconType } from "react-icons";
import useFilters from "../hooks/useFilters";
import { useEffect, useState } from "react";

interface FilterBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}
const FilterBox: React.FC<FilterBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const recipeFilter = useFilters();
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    emptyFilter();
  }, [recipeFilter.dataFilter]);

  const emptyFilter = () => {
    switch (label) {
      case "Type":
        setIsEmpty(recipeFilter.dataFilter?.type.length === 0);
        break;
      case "Diet":
        setIsEmpty(recipeFilter.dataFilter?.diet.length === 0);
        break;
      case "Season":
        setIsEmpty(recipeFilter.dataFilter?.season.length === 0);
        break;
      case "Method":
        setIsEmpty(recipeFilter.dataFilter?.method.length === 0);
        break;
      case "Allergens":
        setIsEmpty(recipeFilter.dataFilter?.allergens.length === 0);
        break;
      case "Events":
        setIsEmpty(recipeFilter.dataFilter?.events.length === 0);
        break;
      case "Time":
        setIsEmpty(
          recipeFilter.dataFilter?.maxHours === 0 &&
            recipeFilter.dataFilter?.maxMinutes === 0
        );
        break;
      case "Ratings":
        setIsEmpty(recipeFilter.dataFilter?.ratings === 0);
        break;
      case "Ingredients":
        setIsEmpty(recipeFilter.dataFilter?.ingredients.length === 0);
        break;
      case "Cuisine":
        setIsEmpty(
          recipeFilter.dataFilter?.cuisine == null ||
            Object.keys(recipeFilter.dataFilter.cuisine).length === 0
        );
        break;
      default:
        break;
    }
  };

  const handleClick = () => {
    recipeFilter.onOpen(label);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-900
        hover:bg-gray-100
        transition
        cursor-pointer
        ${isEmpty ? "" : "text-orange-500"}
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
      >
        <Icon size={26} />
        <div className="font-medium text-sm">{label}</div>
      </div>
    </div>
  );
};

export default FilterBox;
