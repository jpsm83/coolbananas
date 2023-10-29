"use client";

import OptionsInput from "../../inputs/OptionsInput";
import { categories } from "@/app/dataValuesVariables";
import Heading from "../../Heading";
import { SafeUser } from "@/app/types";

interface StepDietProps {
  currentUser?: SafeUser | null | undefined;
  headerOff?: boolean;
  diet: string[] | number[];
  setCustomValue: (value: string, diet: string | number | undefined) => void;
}

const StepDiet: React.FC<StepDietProps> = ({
  diet,
  currentUser,
  setCustomValue,
  headerOff,
}) => {
  const handleTypeClick = (selectedType: string) => {
    if (diet.includes(selectedType as never)) {
      setCustomValue(
        "diet",
        // @ts-ignore
        diet.filter((item: string) => item !== selectedType)
      );
    } else {
      // @ts-ignore
      setCustomValue("diet", [...diet, selectedType]);
    }
  };
  return (
    <div className="flex flex-col gap-8">
      {!headerOff && (
        <Heading
          title={`Who said diets have to be dull and dreary? Not us! Time to spice up someone's else life with yours flavour ${currentUser?.name}`}
          subtitle="Select all diets that apply."
        />
      )}
      <div
        className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    w-full
                    overflow-y-auto
                  "
      >
        {categories.map((category) => {
          if (category.label === "Diet") {
            return category.options.map((item) => (
              <div key={item} className="col-span-1">
                <OptionsInput
                  key={item}
                  onClick={() => handleTypeClick(item)}
                  selected={diet.includes(item as never)}
                  label={item}
                />
              </div>
            ));
          }
          return null; // Render nothing for other categories
        })}
      </div>
    </div>
  );
};

export default StepDiet;
