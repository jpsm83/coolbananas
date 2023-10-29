import { create } from "zustand";
import { SafeRecipe } from "../types";

interface DeleteModalStore {
  isOpen: boolean;
  recipe?: SafeRecipe | null | undefined;
  onOpen: (recipe?: SafeRecipe | null | undefined) => void;
  onClose: () => void;
}

const useDeleteModal = create<DeleteModalStore>((set) => ({
  isOpen: false,
  recipe: null,
  onOpen: (recipe?) => set({ isOpen: true, recipe }),
  onClose: () => set({ isOpen: false, recipe: null }),
}));

export default useDeleteModal;
