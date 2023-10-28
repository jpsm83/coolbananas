"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface TimeInputProps {
  id: string;
  label: string;
  value: number;
  subLabel: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  onClick: () => void;
}

const TimeInput: React.FC<TimeInputProps> = ({
  id,
  label,
  value,
  subLabel,
  disabled,
  register,
  required,
  onClick
}) => {
  return (
    <div className="flex justify-between gap-4
">
      <label
        className="
        w-full
        text-center
          p-4
          font-bold
          text-gray-600
          bg-gray-100 
          border-2
          rounded-md
        "
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          placeholder=" "
          value={value}
          max={59}
          min={0}
          id={id}
          onClick={() => onClick()}
          disabled={disabled}
          {...register(id, { required })}
          className="
          peer
          text-right
          p-4
          w-40
          font-light 
          bg-white 
          border-2
          rounded-md
          h-full
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          "
        />
        <label
          className="
          absolute
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          left-4
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4 text-zinc-400"
        >
          {subLabel}
        </label>
      </div>
    </div>
  );
};

export default TimeInput;