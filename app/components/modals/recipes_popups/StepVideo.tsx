"use client";

import Heading from "../../Heading";
import { FieldValues, UseFormRegister } from "react-hook-form";
import Input from "../../inputs/Input";
import { SafeUser } from "@/app/types";

interface StepVideoProps {
  currentUser: SafeUser | null | undefined;
  isLoading: boolean;
  video: string;
  register: UseFormRegister<FieldValues>;
  setCustomValue: (value: string, video: string | number | undefined) => void;
}

const StepVideo: React.FC<StepVideoProps> = ({
  currentUser,
  isLoading,
  video,
  register,
  setCustomValue,
}) => {

  const handleChange = () => {
    setCustomValue("video", video)
  }

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title={`Lets see you in action ${currentUser?.name}`}
        subtitle="Copy and paste a URL page of your Youtube video cooking this recipe. (optional)"
      />
      <Input
        id="video"
        label="Youtube video (full URL)"
        value={video}
        disabled={isLoading}
        register={register}
        onClick={handleChange}
      />
    </div>
  );
};

export default StepVideo;