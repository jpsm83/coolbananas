"use client";

import { toast } from "react-hot-toast";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { typeReports } from "../../dataValuesVariables";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import useReportModal from "@/app/hooks/useReportModal";
import OptionsInput from "../inputs/OptionsInput";
import { SafeRecipe, SafeReport, SafeUser } from "@/app/types";
import axios from "axios";

interface ReportModalProps {
  recipe?: SafeRecipe;
}
const ReportModal: React.FC<ReportModalProps> = ({ recipe }) => {
  const router = useRouter();
  const reportModal = useReportModal();
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
      type: [],
      comment: "",
      recipeId: recipe?.id,
    },
  });

  const type = watch("type");
  const comment = watch("comment");

  const setCustomValue = (field: string, value: any) => {
    setValue(field, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleTypeClick = (field: string, value: string) => {
    if (field === "type") {
      if (type.includes(value as never)) {
        setCustomValue(
          "type",
          type.filter((item: string) => item !== value)
        );
      } else {
        setCustomValue("type", [...type, value]);
      }
    } else {
      setCustomValue("comment", value);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/api/reports", data);
      toast.success("Report created!");
      router.refresh();
      reset();
      reportModal.onClose();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Does this recipe violate one of our polices?"
        subtitle="Select what most describe the police violation and add your comment."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-full overflow-y-auto">
        {typeReports.map((item) => (
          <div key={item} className="col-span-1">
            <OptionsInput
              key={item}
              onClick={() => handleTypeClick("type", item)}
              //@ts-ignore
              selected={type.includes(item)}
              label={item}
            />
          </div>
        ))}
      </div>
      <Input
        rowSize={5}
        id="comment"
        label="Comment"
        value={comment}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        onClick={() => handleTypeClick("comment", comment)}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={reportModal.isOpen}
      title="Report"
      actionLabel="Report"
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel="Cancel"
      secondaryAction={reportModal.onClose}
      onClose={reportModal.onClose}
      body={bodyContent}
    />
  );
};

export default ReportModal;
