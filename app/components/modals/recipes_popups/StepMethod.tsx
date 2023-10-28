"use client";

import React from "react";
import OptionsInput from "../../inputs/OptionsInput";
import { categories } from "@/app/dataValuesVariables";
import Heading from "../../Heading";
import { SafeUser } from "@/app/types";

interface StepMethodProps {
  currentUser?: SafeUser | null | undefined;
  headerOff?: boolean;
  method: string[] | number[];
  setCustomValue: (value: string, method: string | number | undefined) => void;
}

const StepMethod: React.FC<StepMethodProps> = ({
  method,
  currentUser,
  setCustomValue,
  headerOff,
}) => {
  const handleTypeClick = (selectedType: string) => {
    if (method.includes(selectedType as never)) {
      setCustomValue(
        "method",
        // @ts-ignore
        method.filter((item: string) => item !== selectedType)
      );
    } else {
      // @ts-ignore
      setCustomValue("method", [...method, selectedType]);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {!headerOff && (
        <Heading
          title={`Dirtier, tastier. ${currentUser?.name}, how are we starting the mess?`}
          subtitle="Select all that apply."
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
          if (category.label === "Method") {
            return category.options.map((item) => (
              <div key={item} className="col-span-1">
                <OptionsInput
                  key={item}
                  onClick={() => handleTypeClick(item)}
                  selected={method.includes(item as never)}
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

export default StepMethod;
