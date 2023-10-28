"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
      w-full
      bg-white
      max-w-[2520px]
      md:px-6
      lg:px-10
      xl:px-14
      "
    >
      {children}
    </div>
  );
};

export default Container;
