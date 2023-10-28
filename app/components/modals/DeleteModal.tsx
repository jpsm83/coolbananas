"use client";

import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Heading from "../Heading";
import useDeleteModal from "@/app/hooks/useDeleteModal";
import { SafeRecipe, SafeUser } from "@/app/types";
import axios from "axios";

interface DeleteModalProps {
  recipe: SafeRecipe | null | undefined;
  currentUser: SafeUser | null | undefined;
}
const DeleteModal: React.FC<DeleteModalProps> = ({ currentUser }) => {
  const router = useRouter();
  const deleteModal = useDeleteModal();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = () => {
    if (currentUser?.id === deleteModal.recipe?.authorId) {
      try {
        setIsLoading(true);

        const response = axios
          .delete(`/api/recipes/${deleteModal.recipe?.id}`)
          .then(() => {
            toast.success("Recipe deleted!");
            router.refresh();
            router.push("/");
            deleteModal.onClose();
          });
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Are you sure you want to delete this amazing recipe?"
        subtitle="This action will permanently delete this recipe and has no way back!"
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={deleteModal.isOpen}
      title="Delete recipe"
      actionLabel="Delete"
      onSubmit={() => onClick()}
      secondaryActionLabel="Cancel"
      secondaryAction={deleteModal.onClose}
      onClose={deleteModal.onClose}
      body={bodyContent}
    />
  );
};

export default DeleteModal;