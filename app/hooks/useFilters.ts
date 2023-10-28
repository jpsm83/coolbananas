import { create } from "zustand";

interface RecipeModalFilterStore {
  dataFilter?: { [key: string]: any } | null | undefined;
  category?: string | null | undefined;
  isOpen: boolean;
  url?: string | null | undefined;
  setData: (dataFilter?: object | null | undefined) => void;
  setUrl: (url?: string | null | undefined) => void;
  onOpen: (category?: string | null | undefined) => void;
  onClose: () => void;
}

const useFilters = create<RecipeModalFilterStore>((set) => ({
  dataFilter: {type: [], diet: [], cuisine: {}, season: [], method: [], maxHours: 0, maxMinutes: 0, ingredients: '', allergens: [], events: [], ratings: 0},
  category: null,
  isOpen: false,
  url: '',
  onOpen: (category?) => set({ isOpen: true, category }),
  onClose: () => set({ isOpen: false, category: null }),
  setData: (dataFilter?) => set({ dataFilter }),
  setUrl: (url?) => set({ url }),
}));

export default useFilters;