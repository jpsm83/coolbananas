"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";
import useFilters from "@/app/hooks/useFilters";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRecipeModalCreate from "@/app/hooks/useRecipeModalCreate";
import useEditUserModal from "@/app/hooks/useEditUser";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const recipeModalCreate = useRecipeModalCreate();
  const editUserModal = useEditUserModal();
  const recipeFilter = useFilters();

  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu open/close.
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  // Close the menu when any modal is open.
  useEffect(() => {
    if (
      loginModal.isOpen ||
      registerModal.isOpen ||
      recipeModalCreate.isOpen ||
      editUserModal.isOpen
    ) {
      setIsOpen(false);
    }
  }, [
    loginModal.isOpen,
    registerModal.isOpen,
    recipeModalCreate.isOpen,
    editUserModal.isOpen,
  ]);

  // Helper function to handle redirection and close the menu.
  const handleRedirection = (redirectTo: string) => {
    toggleOpen();
    router.push(redirectTo);
  };

  // Helper function to open different modals.
  const openModal = (modalToOpen: string) => {
    toggleOpen();
    switch (modalToOpen) {
      case "recipeModalCreate":
        recipeModalCreate.onOpen();
        break;
      case "editUserModal":
        editUserModal.onOpen();
        break;
      case "loginModal":
        loginModal.onOpen();
        break;
      case "registerModal":
        registerModal.onOpen();
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm text-center font-semibold py-3 px-4 rounded-full hover:bg-orange-50 transition cursor-pointer"
          onClick={() => {
            if (!currentUser) {
              loginModal.onOpen();
            } else {
              recipeModalCreate.onOpen();
              setIsOpen(false);
            }
          }}
        >
          Create a Recipe
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => handleRedirection("/myCreations")}
                  label="My creations"
                />
                <MenuItem
                  onClick={() => handleRedirection("/myFavorites")}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => openModal("recipeModalCreate")}
                  label="Create a recipe"
                />
                <MenuItem
                  onClick={() => openModal("editUserModal")}
                  label="Edit User"
                />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => openModal("loginModal")}
                  label="Login"
                />
                <MenuItem
                  onClick={() => openModal("registerModal")}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
