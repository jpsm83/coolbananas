import React, { useState, useEffect } from "react";

interface TipsTricksInputProps {
  id: string;
  disabled?: boolean;
  onSave: (tipsTricks: string) => void;
}

const TipsTricksInput: React.FC<TipsTricksInputProps> = ({
  id,
  disabled,
  onSave,
}) => {
  const [tipsTricks, setTipsTricks] = useState("");
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  useEffect(() => {
    setIsSaveButtonDisabled(!tipsTricks);
  }, [tipsTricks]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTipsTricks(e.target.value);
  };

  const handleAddClick = () => {
    if (tipsTricks) {
      onSave(tipsTricks);
      setTipsTricks("");
    }
  };

  return (
    <div>
      <div className="w-full relative">
        <textarea
          rows={2}
          maxLength={50000}
          disabled={disabled}
          name="info"
          value={tipsTricks}
          onChange={handleChange}
          placeholder=" "
          className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 border-neutral-300 focus:border-black"
        />
        <label className="absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-400">
          Tips and tricks
        </label>
      </div>
      <div className="flex mt-2 h-8">
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
    </div>
  );
};

export default TipsTricksInput;
