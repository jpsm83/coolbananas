import { create } from "zustand";
import { SafeUser } from "../types";

interface EditUserModalStore {
  currentUser?: SafeUser | null | undefined;
  isOpen: boolean;
  onOpen: (currentUser?: SafeUser | null | undefined) => void;
  onClose: () => void;
}

const useEditUserModal = create<EditUserModalStore>((set) => ({
  currentUser: null,
  isOpen: false,
  onOpen: (currentUser?) => set({ isOpen: true, currentUser }),
  onClose: () => set({ isOpen: false, currentUser: null }),
}));

export default useEditUserModal;