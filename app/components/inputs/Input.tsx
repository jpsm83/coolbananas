"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  value?: string | number | string[];
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  onClick: () => void;
  rowSize?: number;
  accept?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  value,
  type = "text",
  disabled,
  register,
  required,
  errors,
  onClick,
  rowSize,
}) => {
  const hasErrors = errors?.[id]; // Check if errors[id] exists

  return (
    <div className="w-full relative">
      {id !== "description" &&
      id !== "comment" &&
      id !== "content" &&
      id !== "reply" ? (
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=" "
          type={type}
          value={value}
          onClick={onClick}
          className={`
                peer
                w-full
                p-4
                pt-6 
                font-light 
                bg-white 
                border-2
                rounded-md
                outline-none
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                pl-4
                ${hasErrors ? "border-orange-500" : "border-neutral-300"}
                ${hasErrors ? "focus:border-orange-500" : "focus:border-black"}
              `}
        />
      ) : (
        <textarea
          id={id}
          rows={rowSize}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=" "
          value={value}
          onClick={onClick}
          className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          pl-4
          ${hasErrors ? "border-orange-500" : "border-neutral-300"}
          ${hasErrors ? "focus:border-orange-500" : "focus:border-black"}
        `}
        />
      )}
      <label
        className={`
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
          peer-focus:-translate-y-4
          ${hasErrors ? "text-orange-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
