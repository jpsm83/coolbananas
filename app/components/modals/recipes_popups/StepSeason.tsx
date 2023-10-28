"use client";

import React from "react";
import OptionsInput from "../../inputs/OptionsInput";
import { categories } from "@/app/dataValuesVariables";
import Heading from "../../Heading";
import { SafeUser } from "@/app/types";

interface StepSeasonProps {
  currentUser?: SafeUser | null | undefined;
  headerOff?: boolean;
  season: string[] | number[];
  setCustomValue: (value: string, season: string | number | undefined) => void;
}

const StepSeason: React.FC<StepSeasonProps> = ({
  season,
  setCustomValue,
  currentUser,
  headerOff,
}) => {
  const handleTypeClick = (selectedType: string) => {
    if (season.includes(selectedType as never)) {
      setCustomValue(
        "season",
        // @ts-ignore
        season.filter((item: string) => item !== selectedType)
      );
    } else {
      // @ts-ignore
      setCustomValue("season", [...season, selectedType]);
    }
  };
  return (
    <div className="flex flex-col gap-8">
      {!headerOff && (
        <Heading
          title={`Winter BBQ, nice hot summer soup or whatever, no matter the season, lets get crazy tasty ${currentUser?.name}.`}
          subtitle="Select all seasons that apply."
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
          if (category.label === "Season") {
            return category.options.map((item) => (
              <div key={item} className="col-span-1">
                <OptionsInput
                  key={item}
                  onClick={() => handleTypeClick(item)}
                  selected={season.includes(item as never)}
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

export default StepSeason;