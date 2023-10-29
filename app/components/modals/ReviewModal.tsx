"use client";

import { toast } from "react-hot-toast";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Heading from "../Heading";
import useReviewModal from "@/app/hooks/useReviewModal";
import { SafeRecipe, SafeUser } from "@/app/types";
import axios from "axios";
import Input from "../inputs/Input";
import RatingRadio from "../RatingRadio";

interface ReviewModalProps {
  recipe: SafeRecipe;
  currentUser: SafeUser | null | undefined;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ recipe, currentUser }) => {
  const router = useRouter();
  const reviewtModal = useReviewModal();
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
      content: "",
      recipeId: recipe?.id,
    },
  });

  const content = watch("content");

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
    try {
      setIsLoading(true);
      if (reviewtModal.userReviewId) {
        await axios.put(`/api/reviews/${reviewtModal.userReviewId}`, data);
      } else {
        await axios.post("/api/reviews", data);
      }
      toast.success("Review created!");
      router.refresh();
      reset();
      reviewtModal.onClose();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Tell us, what do you thing?"
        subtitle="Share yours thoughts..."
      />
      <div className="flex flex-row items-end justify-end">
        <RatingRadio size={30} recipe={recipe} currentUser={currentUser} />
      </div>
      <Input
        id="content"
        type="text"
        label="Review"
        value={content}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onClick={() => handleTypeClick("content", content)}
        rowSize={10}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={reviewtModal.isOpen}
      title="Review"
      actionLabel="Review"
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel="Cancel"
      secondaryAction={reviewtModal.onClose}
      onClose={reviewtModal.onClose}
      body={bodyContent}
    />
  );
};

export default ReviewModal;
