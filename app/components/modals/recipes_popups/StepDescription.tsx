"use client";

import Heading from "../../Heading";
import { FieldValues, UseFormRegister } from "react-hook-form";
import Input from "../../inputs/Input";
import { SafeUser } from "@/app/types";

interface StepDescriptionProps {
  currentUser: SafeUser | null | undefined;
  isLoading: boolean;
  description: string;
  register: UseFormRegister<FieldValues>;
  setCustomValue: (
    value: string,
    description: string | number | undefined
  ) => void;
}

const StepDescription: React.FC<StepDescriptionProps> = ({
  isLoading,
  currentUser,
  description,
  register,
  setCustomValue,
}) => {
  const handleChange = () => {
    setCustomValue("description", description);
  };

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title={`${currentUser?.name}, tell us a little bit about your creation. A nice description about what we are going to cook.`}
        subtitle="Write down a description about this recipe."
      />
      <Input
        rowSize={15}
        id="description"
        label="Description"
        value={description}
        disabled={isLoading}
        register={register}
        onClick={handleChange}
      />
    </div>
  );
};

export default StepDescription;
