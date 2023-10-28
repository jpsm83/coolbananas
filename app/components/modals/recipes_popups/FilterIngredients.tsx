"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Input from "../../inputs/Input";
import Heading from "../../Heading";

interface FilterIngredientsProps {
  ingredients: string;
  setCustomValue: (value: string, type: string | number | undefined) => void;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const FilterIngredients: React.FC<FilterIngredientsProps> = ({
  ingredients,
  setCustomValue,
  register,
  errors,
}) => {
  const handleChange = (valueCategory: string, value: string) => {
    setCustomValue(valueCategory, value);
  };

  return (
    <div className="flex flex-col gap-4">
      <Heading title="Add as many ingredients you want separate by coma (,)" />
      <Input
        id={"ingredients"}
        label={"Ingredients"}
        register={register}
        errors={errors}
        onClick={() => handleChange("ingredients", ingredients)}
      />
    </div>
  );
};

export default FilterIngredients;
