"use client";

import Heading from "../../Heading";
import CountrySelect from "../../inputs/CountrySelect";
import { SafeUser } from "@/app/types";

interface StepCuisineProps {
  currentUser?: SafeUser | null | undefined;
  headerOff?: boolean;
  cuisine: object;
  setCustomValue: (id: string, value: object | undefined) => void;
}

const StepCuisine: React.FC<StepCuisineProps> = ({
  headerOff,
  cuisine,
  currentUser,
  setCustomValue,
}) => {

  const handleChange = (cuisine: object) => {
    setCustomValue("cuisine", cuisine === null ? {} : cuisine);
  };

  return (
    <div className="flex flex-col gap-8">
      {!headerOff && (
        <Heading
          title={`Alright, let's embark on a culinary adventure to the "Flavour Wonderland!" Where are your recipe taking us to ${currentUser?.name}?`}
          subtitle="Search the country that apply."
        />
      )}
      <CountrySelect
        // @ts-ignore
        cuisine={cuisine}
        // @ts-ignore
        onChange={handleChange}
      />
    </div>
  );
};

export default StepCuisine;
