"use client";

import useFilters from "@/app/hooks/useFilters";
import Modal from "./Modal";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import StepType from "./recipes_popups/StepType";
import StepDiet from "./recipes_popups/StepDiet";
import StepCuisine from "./recipes_popups/StepCuisine";
import StepSeason from "./recipes_popups/StepSeason";
import StepMethod from "./recipes_popups/StepMethod";
import FilterTime from "./recipes_popups/FilterTime";
import StepAllergens from "./recipes_popups/StepAllergens";
import StepEvents from "./recipes_popups/StepEvents";
import FilterRatings from "./recipes_popups/FilterRatings";
import FilterIngredients from "./recipes_popups/FilterIngredients";

interface RecipeModalFilterProps {
  category: string | null | undefined;
}

const RecipeModalFilter: React.FC<RecipeModalFilterProps> = ({ category }) => {
  const recipeModalFilter = useFilters();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      type: recipeModalFilter?.dataFilter?.type,
      diet: recipeModalFilter?.dataFilter?.diet,
      cuisine: recipeModalFilter?.dataFilter?.cuisine,
      season: recipeModalFilter?.dataFilter?.season,
      method: recipeModalFilter?.dataFilter?.method,
      maxHours: recipeModalFilter?.dataFilter?.maxHours,
      maxMinutes: recipeModalFilter?.dataFilter?.maxMinutes,
      ingredients: recipeModalFilter?.dataFilter?.ingredients,
      allergens: recipeModalFilter?.dataFilter?.allergens,
      events: recipeModalFilter?.dataFilter?.events,
      ratings: recipeModalFilter?.dataFilter?.ratings,
    },
  });

  const type = watch("type");
  const diet = watch("diet");
  const cuisine = watch("cuisine");
  const season = watch("season");
  const method = watch("method");
  const maxHours = watch("maxHours");
  const maxMinutes = watch("maxMinutes");
  const ingredients = watch("ingredients");
  const allergens = watch("allergens");
  const events = watch("events");
  const ratings = watch("ratings");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const clearSelection = () => {
    switch (category) {
      case "Type":
      case "Diet":
      case "Season":
      case "Method":
      case "Allergens":
      case "Events":
        setCustomValue(category.toLowerCase(), []);
        break;
      case "Time":
        setCustomValue("maxHours", 0);
        setCustomValue("maxMinutes", 0);
        break;
      case "Ratings":
        setCustomValue(category.toLowerCase(), 0);
        break;
      case "Ingredients":
        setCustomValue(category.toLowerCase(), "");
        break;
      default:
        break;
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    recipeModalFilter.setData(data);
    recipeModalFilter.onClose();
  };

  let modalTitle = "Recipes filter";

  let bodyContent;

  if (category === "Type") {
    modalTitle = "Filter by courses & types";
    bodyContent = (
      <div>
        <StepType
          type={type}
          setCustomValue={setCustomValue}
          headerOff={true}
        />
      </div>
    );
  }

  if (category === "Diet") {
    modalTitle = "Filter by diet";
    bodyContent = (
      <div>
        <StepDiet
          diet={diet}
          setCustomValue={setCustomValue}
          headerOff={true}
        />
      </div>
    );
  }

  if (category === "Cuisine") {
    modalTitle = "Filter by cuisine from";
    bodyContent = (
      <div>
        <StepCuisine
          cuisine={cuisine}
          setCustomValue={setCustomValue}
          headerOff={true}
        />
      </div>
    );
  }

  if (category === "Season") {
    modalTitle = "Filter by seasons";
    bodyContent = (
      <div>
        <StepSeason
          season={season}
          setCustomValue={setCustomValue}
          headerOff={true}
        />
      </div>
    );
  }

  if (category === "Method") {
    modalTitle = "Filter by Methods";
    bodyContent = (
      <div>
        <StepMethod
          method={method}
          setCustomValue={setCustomValue}
          headerOff={true}
        />
      </div>
    );
  }

  if (category === "Time") {
    modalTitle = "Filter by time to cook";
    bodyContent = (
      <div>
        <FilterTime
          maxHours={maxHours}
          maxMinutes={maxMinutes}
          register={register}
          setCustomValue={setCustomValue}
          isLoading={isLoading}
        />
      </div>
    );
  }

  if (category === "Ingredients") {
    modalTitle = "Filter by ingredients";
    bodyContent = (
      <div>
        <FilterIngredients
          ingredients={ingredients}
          setCustomValue={setCustomValue}
          register={register}
          errors={errors}
        />
      </div>
    );
  }

  if (category === "Allergens") {
    modalTitle = "Filter by allergens";
    bodyContent = (
      <div>
        <StepAllergens
          allergens={allergens}
          setCustomValue={setCustomValue}
          headerOff={true}
        />
      </div>
    );
  }

  if (category === "Events") {
    modalTitle = "Filter by events";
    bodyContent = (
      <div>
        <StepEvents
          events={events}
          setCustomValue={setCustomValue}
          headerOff={true}
        />
      </div>
    );
  }

  if (category === "Ratings") {
    modalTitle = "Filter by minimum ratings";
    bodyContent = (
      <div>
        <FilterRatings ratings={ratings} setCustomValue={setCustomValue} />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={recipeModalFilter.isOpen}
      title={modalTitle}
      actionLabel={"Select"}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={
        category !== "Cuisine" ? "Clear selection" : undefined
      }
      secondaryAction={
        category !== "Cuisine" ? () => clearSelection() : undefined
      }
      onClose={recipeModalFilter.onClose}
      body={bodyContent}
    />
  );
};

export default RecipeModalFilter;
