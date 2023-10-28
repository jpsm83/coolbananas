"use client";

import React from "react";
import TimeInput from "../../inputs/TimeInput";
import { FieldValues, UseFormRegister } from "react-hook-form";
import toast from "react-hot-toast";

interface FilterTimeProps {
  isLoading: boolean;
  maxHours: number;
  maxMinutes: number;
  register: UseFormRegister<FieldValues>;
  setCustomValue: (value: string, type: string | number | undefined) => void;
}

const FilterTime: React.FC<FilterTimeProps> = ({
  isLoading,
  maxHours,
  maxMinutes,
  register,
  setCustomValue,
}) => {
  const handleMaxInputs = (field: string, value: number) => {
    if (value >= 0 && value <= 59) {
      handleChange(field, value);
    } else if (value > 59) {
      toast.error(
        `Maximum value of 59 for ${field === "maxHours" ? "hours" : "minutes"}!`
      );
    } else {
      toast.error(
        `Minimum value of 0 for ${field === "maxHours" ? "hours" : "minutes"}!`
      );
    }
  };

  const handleChange = (valueCategory: string, value: number) => {
    setCustomValue(valueCategory, value);
  };

  return (
    <div className="flex flex-col gap-4">
      <TimeInput
        id="maxHours"
        label="Max hours"
        value={maxHours}
        subLabel="hours"
        disabled={isLoading}
        register={register}
        onClick={() => handleMaxInputs("maxHours", maxHours)}
      />
      <TimeInput
        id="maxMinutes"
        label="Max minutes"
        value={maxMinutes}
        subLabel="minutes"
        disabled={isLoading}
        register={register}
        onClick={() => handleMaxInputs("maxMinutes", maxMinutes)}
      />
    </div>
  );
};

export default FilterTime;
