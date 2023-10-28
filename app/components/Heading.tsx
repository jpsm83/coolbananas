"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="cursor-default text-2xl font-bold">{title}</div>
      <div className="cursor-default font-light text-neutral-500 mt-2 text-justify">{subtitle}</div>
    </div>
  );
};

export default Heading;