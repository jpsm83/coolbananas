"use client";

import Heading from "../../Heading";
import { FieldValues, UseFormRegister } from "react-hook-form";
import TimeInput from "../../inputs/TimeInput";
import { SafeUser } from "@/app/types";

interface StepNutricionProps {
  currentUser: SafeUser | null | undefined;
  isLoading: boolean;
  carbs: number;
  sugars: number;
  protein: number;
  fat: number;
  fibre: number;
  kcal: number;
  salt: number;
  saturates: number;
  register: UseFormRegister<FieldValues>;
  setCustomValue: (value: string, photos: string | number | undefined) => void;
}

const StepNutricion: React.FC<StepNutricionProps> = ({
  isLoading,
  carbs,
  sugars,
  protein,
  fat,
  currentUser,
  fibre,
  kcal,
  salt,
  saturates,
  register,
  setCustomValue,
}) => {
  const handleChange = (valueCategory: string, value: number) => {
    setCustomValue(valueCategory, value);
  };

  return (
    <div className="flex flex-col gap-4">
      <Heading
        title={`ONLY IF YOU KNOW ${currentUser?.name?.toUpperCase()}, add the nutricional info of your creation. Otherways leave this part in blank. We are going to eat anyway...`}
        subtitle="Fill up the nutritional information PER SERVING."
      />
      <TimeInput
        id="carbs"
        label="Carbs"
        value={carbs}
        subLabel="Grams"
        disabled={isLoading}
        register={register}
        onClick={() => handleChange("carbs", carbs)}
      />
      <TimeInput
        id="sugars"
        label="Sugars"
        value={sugars}
        subLabel="Grams"
        disabled={isLoading}
        register={register}
        onClick={() => handleChange("sugars", sugars)}
      />
      <TimeInput
        id="protein"
        label="Protein"
        value={protein}
        subLabel="Grams"
        disabled={isLoading}
        register={register}
        onClick={() => handleChange("protein", protein)}
      />
      <TimeInput
        id="fat"
        label="Fat"
        value={fat}
        subLabel="Grams"
        disabled={isLoading}
        register={register}
        onClick={() => handleChange("fat", fat)}
      />
      <TimeInput
        id="fibre"
        label="Fibre"
        value={fibre}
        subLabel="Grams"
        disabled={isLoading}
        register={register}
        onClick={() => handleChange("fibre", fibre)}
      />
      <TimeInput
        id="kcal"
        label="Kcal"
        value={kcal}
        subLabel="kcal"
        disabled={isLoading}
        register={register}
        onClick={() => handleChange("kcal", kcal)}
      />
      <TimeInput
        id="salt"
        label="Salt"
        value={salt}
        subLabel="Grams"
        disabled={isLoading}
        register={register}
        onClick={() => handleChange("salt", salt)}
      />
      <TimeInput
        id="saturates"
        label="Saturates"
        value={saturates}
        subLabel="Grams"
        disabled={isLoading}
        register={register}
        onClick={() => handleChange("saturates", saturates)}
      />
    </div>
  );
};

export default StepNutricion;