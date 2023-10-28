"use client";

import React from "react";
import OptionsInput from "../../inputs/OptionsInput";
import { categories } from "@/app/dataValuesVariables";
import Heading from "../../Heading";
import { SafeUser } from "@/app/types";

interface StepTypeProps {
  currentUser?: SafeUser | null | undefined;
  headerOff?: boolean;
  type?: string[];
  setCustomValue: (value: string, type: string | number | undefined ) => void;
}

const StepType: React.FC<StepTypeProps> = ({
  type,
  setCustomValue,
  currentUser,
  headerOff,
}) => {

  const handleTypeClick = (selectedType: string) => {
    if (type?.includes(selectedType as never)) {
      setCustomValue(
        "type",
        // @ts-ignore
        type?.filter((item: string) => item !== selectedType)
      );
    } else {
      // @ts-ignore
      setCustomValue("type", [...type, selectedType]);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {!headerOff && (
        <Heading
          title={`Cook it's all about personal touches and fun in the kitchen! What type of dish are we creating today ${currentUser?.name}?`}
          subtitle="Select all courses and types that apply."
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
          if (category.label === "Type") {
            return category.options.sort().map((item) => (
              <div key={item} className="col-span-1">
                <OptionsInput
                  key={item}
                  onClick={() => handleTypeClick(item)}
                  selected={type?.includes(item as never)}
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

export default StepType;