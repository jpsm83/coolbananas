"use client";

interface ImageInputProps {
  type?: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  accept?: string;
  disable: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({
  type = "file",
  onChange,
  accept = ".gif,.jpg,.jpeg,.webP,.png,svg",
  disable = false,
}) => {
  return (
    <div className="flex justify-center items-center">
      <input
        disabled={disable}
        type={type}
        accept={accept}
        onChange={onChange}
        className="w-full p-4 border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed border-neutral-300  focus:border-black text-transparent"
      />
    </div>
  );
};

export default ImageInput;
