"use client";

import PreparationsInput from "../../inputs/PreparationsInput";
import Image from "next/image";
import Heading from "../../Heading";
import { SafeUser } from "@/app/types";

interface StepPreparationProps {
  currentUser: SafeUser | null | undefined;
  preparation: string[];
  isLoading: boolean;
  setCustomValue: (value: string, preparation: string[]) => void;
}

const StepPreparation: React.FC<StepPreparationProps> = ({
  preparation,
  isLoading,
  currentUser,
  setCustomValue,
}) => {
  const handlePreparationsSave = (prep: string) => {
    setCustomValue("preparation", [...preparation, prep]);
  };

  const handleDeletePreparations = (index: number) => {
    setCustomValue(
      "preparation",
      preparation.filter((_: any, i: number) => i !== index)
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title={`Chop chop chop, cut cut cut, laugh laugh laugh and get ready ${currentUser?.name}. Tell us how to start the mess.`}
        subtitle="Write down the steps for preparation in order please."
      />
      <PreparationsInput
        id="preparation"
        onSave={handlePreparationsSave}
        disabled={isLoading}
      />
      <div className="flex flex-col max-h-[25vh] overflow-y-auto cursor-default">
        {preparation.map((preparations: any, index: number) => (
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
              <p>{preparations}</p>
            </div>
              <button
                onClick={() => handleDeletePreparations(index)}
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

export default StepPreparation;
