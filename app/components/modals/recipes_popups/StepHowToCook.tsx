"use client";

import HowToCookInput from "../../inputs/HowToCookInput";
import Image from "next/image";
import Heading from "../../Heading";
import { SafeUser } from "@/app/types";

interface StepHowToCookProps {
  howToCook: string[];
  isLoading: boolean;
  currentUser: SafeUser | null | undefined;
  setCustomValue: (value: string, howToCook: string[]) => void;
}

const StepHowToCook: React.FC<StepHowToCookProps> = ({
  howToCook,
  isLoading,
  currentUser,
  setCustomValue,
}) => {
  const handleHowToCookSave = (cook: string) => {
    setCustomValue("howToCook", [...howToCook, cook]);
  };
  const handleDeleteHowToCook = (index: number) => {
    setCustomValue(
      "howToCook",
      howToCook.filter((_: any, i: number) => i !== index)
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title={`Reeeeeady, steeeeeady and go... Let the fun begging ${currentUser?.name}.`}
        subtitle="Write down the steps for cooking in order please"
      />
      <HowToCookInput
        id="howToCook"
        onSave={handleHowToCookSave}
        disabled={isLoading}
      />
      <div className="flex flex-col max-h-[25vh] overflow-y-auto cursor-default">
        {howToCook.map((howToCook: any, index: number) => (
          <div
            key={index}
            className="
                flex
                flex-row
                justify-between
                gap-6
                w-full
                font-bold
                text-gray-600
                border-t-2
                py-2"
          >
            <div className="flex flex-row gap-4 text-justify">
              <p className="flex flex-wrap">{index + 1}-</p>
              <p>{howToCook}</p>
            </div>
              <button
                onClick={() => handleDeleteHowToCook(index)}
                className="text-red-400 hover:text-red-800 w-6 flex items-end ml-2"
              >
                X
              </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default StepHowToCook;
