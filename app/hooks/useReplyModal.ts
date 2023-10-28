import { create } from "zustand";
import { SafeReview } from "../types";

interface ReplyModalStore {
  isOpen: boolean;
  review?: SafeReview | null | undefined;
  onOpen: (review?: SafeReview | null | undefined) => void;
  onClose: () => void;
}

const useReplyModal = create<ReplyModalStore>((set) => ({
  isOpen: false,
  review: null,
  onOpen: (review?) => set({ isOpen: true, review }),
  onClose: () => set({ isOpen: false, review: null }),
}));

export default useReplyModal;
