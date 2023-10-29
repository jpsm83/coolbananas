"use client";

import OptionsInput from "../../inputs/OptionsInput";
import { categories } from "@/app/dataValuesVariables";
import Heading from "../../Heading";
import { SafeUser } from "@/app/types";

interface StepAllergensProps {
  currentUser?: SafeUser | null | undefined;
  headerOff?: boolean;
  allergens: string[] | number[];
  setCustomValue: (
    value: string,
    allergens: string | number | undefined
  ) => void;
}

const StepAllergens: React.FC<StepAllergensProps> = ({
  headerOff,
  currentUser,
  allergens,
  setCustomValue,
}) => {
  const handleTypeClick = (selectedType: string) => {
    if (allergens.includes(selectedType as never)) {
      setCustomValue(
        "allergens",
        // @ts-ignore
        allergens.filter((item: string) => item !== selectedType)
      );
    } else {
      // @ts-ignore
      setCustomValue("allergens", [...allergens, selectedType]);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {!headerOff && (
        <Heading
          title={`Careful, if you are a vampire, dont eat garlic ${currentUser?.name}`}
          subtitle="Select all that apply ONLY if you know. Otherways leave in blank"
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
          if (category.label === "Allergens") {
            return category.options.sort().map((item) => (
              <div key={item} className="col-span-1">
                <OptionsInput
                  key={item}
                  onClick={() => handleTypeClick(item)}
                  selected={allergens.includes(item as never)}
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

export default StepAllergens;
