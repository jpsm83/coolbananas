"use client";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import Select from "react-select";
import useCountries from "@/app/hooks/useCountries";

export type CountrySelectValue = {
  country: string;
  region: string;
  cca2: string;
};

interface CountrySelectProps {
  cuisine?: CountrySelectValue;
  onChange: (cuisine: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ cuisine, onChange }) => {
  const { getAll, getByValue } = useCountries();

  return (
    <div>
      <Select
        placeholder="Where to..."
        isClearable
        options={getAll()}
        value={cuisine && getByValue(cuisine?.cca2)}
        onChange={(value) => onChange(value)}
        formatOptionLabel={(option: any) => {
          return (
            <div
              className="
          flex flex-row items-center gap-3"
            >
              <span className={`fi fi-${option.flag}`}></span>
              <div>
                {option.value}
                <span className="text-neutral-500 ml-1">{option.region}</span>
              </div>
            </div>
          );
        }}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "#f97316",
            primary25: "#f97316",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
