"use client";

import Heading from "../../Heading";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Input from "../../inputs/Input";
import { SafeUser } from "@/app/types";

interface StepNameProps {
  currentUser: SafeUser | null | undefined;
  isLoading: boolean;
  name: string;
  register: UseFormRegister<FieldValues>;
  setCustomValue: (value: string, name: string | number | undefined) => void;
}

const StepName: React.FC<StepNameProps> = ({
  isLoading,
  currentUser,
  name,
  register,
  setCustomValue,
}) => {

  const handleChange = () => {
    setCustomValue("name", name)
  }
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title={`Hey ${currentUser?.name}, how should we call this amazing recipe?`}
        subtitle="Write down the unique recipe name"
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        onClick={handleChange}
      />
    </div>
  );
};

export default StepName;