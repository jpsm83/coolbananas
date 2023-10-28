"use client";

import Heading from "../../Heading";
import { FieldValues, UseFormRegister } from "react-hook-form";
import TimeInput from "../../inputs/TimeInput";
import { SafeUser } from "@/app/types";

interface StepTimeProps {
  currentUser: SafeUser | null | undefined;
  isLoading: boolean;
  timePrep: number;
  register: UseFormRegister<FieldValues>;
  timeCook: number;
  timeAdditional: number;
  servings: number;
  setCustomValue: (valueCategory: string, value: number | undefined) => void;
}

const StepTime: React.FC<StepTimeProps> = ({
  isLoading,
  currentUser,
  timePrep,
  timeCook,
  timeAdditional,
  servings,
  register,
  setCustomValue,
}) => {

  const handleChange = (valueCategory: string, value: number) => {
    setCustomValue(valueCategory, value)
  }

  return (
    <div className="flex flex-col gap-4">
      <Heading
        title={`Tell us ${currentUser?.name}, how long will take us to eat this delicious creation?`}
        subtitle="Write down the times in minutes."
      />
      <TimeInput
        id="timePrep"
        label="Preparation time"
        value={timePrep}
        subLabel="Minutes"
        disabled={isLoading}
        register={register}
        required
        onClick={() => handleChange("timePrep", timePrep)}
      />
      <TimeInput
        id="timeCook"
        label="Cooking time"
        value={timeCook}
        subLabel="Minutes"
        disabled={isLoading}
        register={register}
        required
        onClick={() => handleChange("timeCook", timeCook)}
      />
      <TimeInput
        id="timeAdditional"
        label="Addicional time"
        value={timeAdditional}
        subLabel="Minutes"
        disabled={isLoading}
        register={register}
        onClick={() => handleChange("timeAdditional", timeAdditional)
        }
      />
      <TimeInput
        id="servings"
        label="Servings"
        value={servings}
        subLabel="People"
        disabled={isLoading}
        register={register}
        required
        onClick={() => handleChange("servings", servings)}
      />
    </div>
  );
};

export default StepTime;