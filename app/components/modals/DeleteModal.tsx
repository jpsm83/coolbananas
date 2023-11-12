"use client";

import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Heading from "../Heading";
import useDeleteModal from "@/app/hooks/useDeleteModal";
import { SafeUser } from "@/app/types";
import axios, { AxiosResponse } from "axios";

interface DeleteModalProps {
  
  currentUser: SafeUser | null | undefined;
}
const DeleteModal: React.FC<DeleteModalProps> = ({ currentUser }) => {
  const router = useRouter();
  const deleteModal = useDeleteModal();
  const [isLoading, setIsLoading] = useState(false);

  const deleteImagesInCloudinary = async (
    imageUrlToDelete: string[] | undefined | null
  ): Promise<AxiosResponse | null> => {
    if (imageUrlToDelete && imageUrlToDelete?.length > 0) {
      let publicIds: string[] = [];
      imageUrlToDelete?.forEach((url) => {
        // @ts-ignore
        publicIds.push(url.split("/").pop().split(".")[0]);
      });
      try {
        const deleteResponse = await axios.delete("/api/upload", {
          data: { publicIds: publicIds },
        });
        if (deleteResponse.status === 200) {
          return deleteResponse;
        } else {
          console.error("Failed to delete images");
          return null;
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    return null;
  };

  const onClick = async () => {
    if (currentUser?.id === deleteModal.recipe?.authorId) {
      try {
        setIsLoading(true);
        await axios.delete(`/api/recipes/${deleteModal.recipe?.id}`);
        await deleteImagesInCloudinary(deleteModal.recipe?.imageSrc);
        toast.success("Recipe deleted!");
        router.refresh();
        router.push("/");
        deleteModal.onClose();
      } catch (error) {
        console.error("Error deleting recipe:", error);
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
