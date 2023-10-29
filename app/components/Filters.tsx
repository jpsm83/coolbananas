"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categories } from "../dataValuesVariables";
import Container from "./Container";
import FilterBox from "./FilterBox";
import RecipeModalFilter from "./modals/RecipeModalFilter";
import useFilters from "@/app/hooks/useFilters";
import { useEffect, useState } from "react";

const Filters = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const recipeFilters = useFilters();
  const router = useRouter();
  const pathname = usePathname();

  const [currentPath, setCurrentPath] = useState<string | null>(null);

  const setQueryUrl = () => {
    let filterUrl;
    let queryUrl = "";

    if (pathname !== currentPath) {
      // If pathname and currentPath are different, update currentPath and make queryUrl empty
      setCurrentPath(pathname);
      queryUrl = "";
    }

    const allFilters = [
      "type",
      "diet",
      "cuisine",
      "season",
      "method",
      "time",
      "ingredients",
      "allergens",
      "events",
      "ratings",
    ];

    for (let x = 0; x < allFilters.length; x++) {
      const filterName = allFilters[x];
      const filterValues = recipeFilters.dataFilter?.[filterName];

      if (
        filterName === "cuisine" &&
        recipeFilters.dataFilter?.cuisine?.value
      ) {
        queryUrl += `&country=${recipeFilters.dataFilter.cuisine.value}`;
      } else if (
        filterName === "time" &&
        (recipeFilters.dataFilter?.maxHours > 0 ||
          recipeFilters.dataFilter?.maxMinutes > 0)
      ) {
        queryUrl += `&time=${
          recipeFilters.dataFilter?.maxHours * 60 +
          recipeFilters.dataFilter?.maxMinutes
        }`;
      } else if (
        filterName === "ingredients" &&
        recipeFilters.dataFilter?.ingredients.length > 0
      ) {
        queryUrl += "&ingredients=";
        const ingredients = recipeFilters.dataFilter?.ingredients
          .toLowerCase()
          .split(", ");
        for (let a = 0; a < ingredients.length; a++) {
          queryUrl += ingredients[a];
          if (a !== ingredients.length - 1) {
            queryUrl += ",";
          }
        }
      } else if (
        filterName === "ratings" &&
        recipeFilters.dataFilter?.ratings > 0
      ) {
        queryUrl += `&ratings=${recipeFilters.dataFilter?.ratings}`;
      } else {
        if (filterValues && filterValues.length > 0) {
          queryUrl += `&${filterName}=`;
          for (let i = 0; i < filterValues.length; i++) {
            queryUrl += filterValues[i];
            if (i !== filterValues.length - 1) {
              queryUrl += ",";
            }
          }
        }
      }
    }

    if (queryUrl.length > 0) {
      filterUrl = pathname + "?" + queryUrl.slice(1);
    } else {
      filterUrl = pathname;
    }
    recipeFilters.setUrl("?" + queryUrl.slice(1));
    return filterUrl;
  };

  useEffect(() => {
    router.push(setQueryUrl()!);
  }, [recipeFilters.dataFilter]);

  return (
    <Container>
      <div className="flex flex-col pt-5">
        <RecipeModalFilter category={recipeFilters?.category} />
        <div
          className="
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
        >
          {categories.map((item) => (
            <FilterBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          ))}
        </div>
        <hr />
      </div>
    </Container>
  );
};

export default Filters;
