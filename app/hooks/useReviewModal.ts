import { create } from "zustand";

interface ReviewModalStore {
  userReviewId?: string | null | undefined;
  isOpen: boolean;
  setReviewId: (userReviewId?: string | null | undefined) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useReviewModal = create<ReviewModalStore>((set) => ({
  userReviewId: null,
  isOpen: false,
  setReviewId: (userReviewId?) => set({ userReviewId }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, userReviewId: null }),
}));

export default useReviewModal;
