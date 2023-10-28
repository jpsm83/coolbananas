import { create } from "zustand";

interface RecipeModalCreateStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRecipeModalCreate = create<RecipeModalCreateStore>((set) => ({
  recipe: null,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
})
);

export default useRecipeModalCreate;
