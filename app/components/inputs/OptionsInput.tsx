"use client";

interface OptionsInputProps {
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const OptionsInput: React.FC<OptionsInputProps> = ({
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        text-center
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? "border-orange-500" : "border-neutral-200"}
      `}
    >
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default OptionsInput;
