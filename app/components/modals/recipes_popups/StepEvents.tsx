"use client";

import OptionsInput from "../../inputs/OptionsInput";
import { categories } from "@/app/dataValuesVariables";
import Heading from "../../Heading";
import { SafeUser } from "@/app/types";

interface StepEventsProps {
  currentUser?: SafeUser | null | undefined;
  headerOff?: boolean;
  events: string[] | number[];
  setCustomValue: (value: string, events: string | number | undefined) => void;
}

const StepEvents: React.FC<StepEventsProps> = ({
  events,
  setCustomValue,
  currentUser,
  headerOff,
}) => {
  const handleTypeClick = (selectedType: string) => {
    if (events.includes(selectedType as never)) {
      setCustomValue(
        "events",
        // @ts-ignore
        events.filter((item: string) => item !== selectedType)
      );
    } else {
      // @ts-ignore
      setCustomValue("events", [...events, selectedType]);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {!headerOff && (
        <Heading
          title={`Hey ${currentUser?.name} Does it fit better in a special ocasion?`}
          subtitle="Select all that apply. (optional)"
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
          if (category.label === "Events") {
            return category.options.map((item) => (
              <div key={item} className="col-span-1">
                <OptionsInput
                  key={item}
                  onClick={() => handleTypeClick(item)}
                  selected={events.includes(item as never)}
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

export default StepEvents;
