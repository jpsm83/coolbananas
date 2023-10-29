"use client";

import { toast } from "react-hot-toast";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Heading from "../Heading";
import useReplyModal from "@/app/hooks/useReplyModal";
import { SafeRecipe, SafeUser } from "@/app/types";
import axios from "axios";
import Input from "../inputs/Input";

interface ReplyModalProps {
  recipe: SafeRecipe;
  currentUser: SafeUser | null | undefined;
}
const ReplyModal: React.FC<ReplyModalProps> = ({ currentUser, recipe }) => {
  const router = useRouter();
  const replyModal = useReplyModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      reply: "",
    },
  });

  const reply = watch("reply");

  const setCustomValue = (field: string, value: any) => {
    setValue(field, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleTypeClick = (field: string, value: string) => {
    setCustomValue(field, [value]);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (currentUser?.id === recipe.authorId) {
      try {
        setIsLoading(true);
        const response = await axios
          .put(`/api/reviews/${replyModal.review?.id}`, data)
          .then(() => {
            toast.success("Review replyed!");
            router.refresh();
            reset();
            replyModal.onClose();
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
        title="Reply the review."
        subtitle="Let us know what you want add to the review."
      />
      <Input
        id="reply"
        type="text"
        label="Reply"
        value={reply}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onClick={() => handleTypeClick("reply", reply)}
        rowSize={5}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={replyModal.isOpen}
      title="Reply"
      actionLabel="Reply"
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel="Cancel"
      secondaryAction={replyModal.onClose}
      onClose={replyModal.onClose}
      body={bodyContent}
    />
  );
};

export default ReplyModal;
