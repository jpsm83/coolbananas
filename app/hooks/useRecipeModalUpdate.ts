import { create } from "zustand";
import { SafeRecipe } from "../types";

interface RecipeModalUpdateStore {
  recipe?: SafeRecipe | null | undefined | string;
  isOpen: boolean;
  onOpen: (recipe?: SafeRecipe | null | undefined) => void;
  onClose: () => void;
}

const useRecipeModalUpdate = create<RecipeModalUpdateStore>((set) => ({
  recipe: null,
  isOpen: false,
  onOpen: (recipe?) => set({ isOpen: true, recipe }),
  onClose: () => set({ isOpen: false, recipe: null }),
})
);

export default useRecipeModalUpdate;