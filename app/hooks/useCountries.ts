import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  cca2: country.cca2,
  value: country.name.common,
  region: country.region,
  flag: country.cca2.toLowerCase(),
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.cca2 === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;