"use client";

import TipsTricksInput from "../../inputs/TipsTricksInput";
import Heading from "../../Heading";
import { SafeUser } from "@/app/types";

interface StepTipsTricksProps {
  currentUser: SafeUser | null | undefined;
  tipsTricks: string[];
  isLoading: boolean;
  setCustomValue: (value: string, tipsTricks: string[]) => void;
}

const StepTipsTricks: React.FC<StepTipsTricksProps> = ({
  tipsTricks,
  isLoading,
  currentUser,
  setCustomValue,
}) => {
  const handleTipsTricksSave = (tipsTrick: string) => {
    setCustomValue("tipsTricks", [...tipsTricks, tipsTrick]);
  };

  const handleDeleteTipsTricks = (index: number) => {
    setCustomValue(
      "tipsTricks",
      tipsTricks.filter((_: any, i: number) => i !== index)
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title={`Do you know magic ${currentUser?.name}? Let us know how to take a rabbit off a hat.`}
        subtitle="Write down some tips, tricks or just a comment on how to better cook this recipe."
      />
      <TipsTricksInput
        id="tipsTricks"
        onSave={handleTipsTricksSave}
        disabled={isLoading}
      />
      <div className="flex flex-col max-h-[25vh] overflow-y-auto cursor-default">
        {tipsTricks.map((tipsTricks: any, index: number) => (
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
              <p>{tipsTricks}</p>
            </div>
              <button
                onClick={() => handleDeleteTipsTricks(index)}
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

export default StepTipsTricks;