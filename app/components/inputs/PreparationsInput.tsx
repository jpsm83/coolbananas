"use client";

import { useState, useEffect } from "react";

interface PreparationsInputProps {
  id: string;
  disabled?: boolean;
  onSave: (preparations: string) => void;
}

const PreparationsInput: React.FC<PreparationsInputProps> = ({
  id,
  disabled,
  onSave,
}) => {
  const [preparations, setPreparations] = useState("");
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  useEffect(() => {
    setIsSaveButtonDisabled(!preparations);
  }, [preparations]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreparations(e.target.value);
  };

  const handleAddClick = () => {
    if (preparations) {
      onSave(preparations);
      setPreparations("");
    }
  };

  return (
    <div>
      <div className="w-full relative">
        <textarea
          rows={2}
          id={`info-${id}`}
          maxLength={50000}
          disabled={disabled}
          name="info"
          value={preparations}
          onChange={handleChange}
          placeholder=" "
          className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black"
        />
        <label className="absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400">
          Preparation steps
        </label>
      </div>
      <button
        onClick={handleAddClick}
        disabled={isSaveButtonDisabled}
        className={`relative w-full rounded-lg text-xl font-bold text-white transition ${
          isSaveButtonDisabled
            ? "bg-gray-500 opacity-80 hover:opacity-100 cursor-not-allowed"
            : "bg-green-800 opacity-80 hover:opacity-100 cursor-pointer"
        }`}
      >
        Add
      </button>
    </div>
  );
};

export default PreparationsInput;
