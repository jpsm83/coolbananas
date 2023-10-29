"use client";

interface InputProps {
  id: string;
  label: string;
  value?: string | number | string[];
  type?: string;
  disabled?: boolean;
  onChange: () => void;
  accept?: string;
}

const ImageUpload: React.FC<InputProps> = ({
  id,
  label,
  value,
  type = "file",
  disabled,
  onChange,
  accept = ".gif,.jpg,.jpeg,.webP,.png,svg",
}) => {
  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        placeholder="Click to upload"
        type={type}
        value={value}
        accept={accept}
        onChange={onChange}
        className="
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
                pl-4 border-neutral-300 focus:border-black"
      />
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
          peer-focus:-translate-y-4text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default ImageUpload;
