"use client";

import Button from "./Button";
import Heading from "./Heading";
import useRecipeModal from "../hooks/useRecipeModalCreate";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  createRecipe?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact recipes matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
  createRecipe,
}) => {
  const recipeModal = useRecipeModal();

  const createRecipePopup = () => {
    recipeModal.onOpen();
  };

  return (
    <div
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4"></div>
      <div className="w-48 mt-4">
        {createRecipe && (
          <Button label="Create Recipe" onClick={() => createRecipePopup()} />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
