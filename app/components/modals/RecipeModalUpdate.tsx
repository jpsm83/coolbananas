"use client";

import axios, { AxiosResponse } from "axios";
import useRecipeModalUpdate from "@/app/hooks/useRecipeModalUpdate";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import StepDescription from "./recipes_popups/StepDescription";
import StepType from "./recipes_popups/StepType";
import StepDiet from "./recipes_popups/StepDiet";
import StepSeason from "./recipes_popups/StepSeason";
import StepMethod from "./recipes_popups/StepMethod";
import StepTime from "./recipes_popups/StepTime";
import StepIngredients from "./recipes_popups/StepIngredients";
import StepTipsTricks from "./recipes_popups/StepTipsTricks";
import StepPreparation from "./recipes_popups/StepPreparation";
import StepHowToCook from "./recipes_popups/StepHowToCook";
import StepAllergens from "./recipes_popups/StepAllergens";
import StepEvents from "./recipes_popups/StepEvents";
import StepPhotos from "./recipes_popups/StepPhotos";
import StepVideo from "./recipes_popups/StepVideo";
import StepNutricion from "./recipes_popups/StepNutricion";
import { SafeRecipe, SafeUser } from "@/app/types";
import StepName from "./recipes_popups/StepName";
import StepCuisine from "./recipes_popups/StepCuisine";

enum STEPS {
  LEGAL = 0,
  NAME = 1,
  DESCRIPTION = 2,
  TYPE = 3,
  DIET = 4,
  CUISINE = 5,
  SEASON = 6,
  METHOD = 7,
  TIME = 8,
  INGREDIENTS = 9,
  TIPS = 10,
  PREP = 11,
  COOK = 12,
  ALLERGENS = 13,
  EVENTS = 14,
  PHOTO = 15,
  VIDEO = 16,
  NUTRI = 17,
}

interface RecipeModalCreateProps {
  recipe?: SafeRecipe | null | undefined;
  currentUser: SafeUser | null | undefined;
}

const RecipeModalCreate: React.FC<RecipeModalCreateProps> = ({
  recipe,
  currentUser,
}) => {
  const router = useRouter();
  const recipeModalUpdate = useRecipeModalUpdate();
  const [step, setStep] = useState(STEPS.PHOTO);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: recipe?.name,
      description: recipe?.description,
      imageSrc: recipe?.imageSrc,
      imageFileToAdd: [],
      imageUrlToDelete: [],
      type: recipe?.type,
      diet: recipe?.diet,
      cuisine: recipe?.cuisine,
      season: recipe?.season,
      method: recipe?.method,
      timePrep: recipe?.timePrep,
      timeCook: recipe?.timeCook,
      timeAdditional: recipe?.timeAdditional,
      servings: recipe?.servings,
      ingredients: recipe?.ingredients,
      tipsTricks: recipe?.tipsTricks,
      preparation: recipe?.preparation,
      howToCook: recipe?.howToCook,
      allergens: recipe?.allergens,
      events: recipe?.events,
      video: recipe?.video,
      carbs: recipe?.carbs,
      sugars: recipe?.sugars,
      protein: recipe?.protein,
      fat: recipe?.fat,
      fibre: recipe?.fibre,
      kcal: recipe?.kcal,
      salt: recipe?.salt,
      saturates: recipe?.saturates,
    },
  });

  const name = watch("name");
  const description = watch("description");
  const imageSrc = watch("imageSrc");
  const imageFileToAdd = watch("imageFileToAdd");
  const imageUrlToDelete = watch("imageUrlToDelete");
  const type = watch("type");
  const diet = watch("diet");
  const cuisine = watch("cuisine");
  const season = watch("season");
  const method = watch("method");
  const timePrep = watch("timePrep");
  const timeCook = watch("timeCook");
  const timeAdditional = watch("timeAdditional");
  const servings = watch("servings");
  const ingredients = watch("ingredients");
  const tipsTricks = watch("tipsTricks");
  const preparation = watch("preparation");
  const howToCook = watch("howToCook");
  const allergens = watch("allergens");
  const events = watch("events");
  const video = watch("video");
  const carbs = watch("carbs");
  const sugars = watch("sugars");
  const protein = watch("protein");
  const fat = watch("fat");
  const fibre = watch("fibre");
  const kcal = watch("kcal");
  const salt = watch("salt");
  const saturates = watch("saturates");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    if (step === STEPS.TYPE && type.length === 0) {
      toast;
      toast.error("Select at least one type!");
      return;
    }
    if (step === STEPS.DIET && diet.length === 0) {
      toast.error("Select at least one diet!");
      return;
    }
    if (step === STEPS.CUISINE && cuisine.length === 0) {
      toast.error("Select a country cuisine!");
      return;
    }
    if (step === STEPS.SEASON && season.length === 0) {
      toast.error("Select at least one season!");
      return;
    }
    if (step === STEPS.METHOD && method.length === 0) {
      toast.error("Select at least one method!");
      return;
    }
    if (step === STEPS.TIME && (timePrep < 1 || timeCook < 1 || servings < 1)) {
      toast.error("Only addicional time can be 0!");
      return;
    }
    if (step === STEPS.INGREDIENTS && ingredients.length === 0) {
      toast.error("Add some ingredients!");
      return;
    }
    if (step === STEPS.PREP && preparation.length === 0) {
      toast.error("Add preparation steps before cook!");
      return;
    }
    if (step === STEPS.COOK && howToCook.length === 0) {
      toast.error("Add how to cook steps!");
      return;
    }
    // if (step === STEPS.PHOTO && imageSrc.length === 0) {
    //   toast.error("Add at least one photo!");
    //   return;
    // }
    if (
      step === STEPS.VIDEO &&
      video.length > 0 &&
      !video.includes("youtube.com/watch?v=")
    ) {
      toast.error("Invalid Youtube Page!");
      return;
    }

    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.NUTRI) {
      return onNext();
    }

    await updateImagesSrc(imageFileToAdd);

    let listIngredientsNamesArray: string[] = [];

    const createListIngredientsNamesArray = () => {
      ingredients.forEach((ingredient: { name: string }) => {
        const sanitazeNames = ingredient.name.toLowerCase();
        listIngredientsNamesArray.push(sanitazeNames);
      });
    };

    const updatedData = {
      // updatedAt: new Date(),
      name: name,
      description: description,
      imageSrc: imageSrc,
      type: type,
      diet: diet,
      cuisine: cuisine,
      country: cuisine.value,
      season: season,
      method: method,
      timePrep: Number(timePrep),
      timeCook: Number(timeCook),
      timeAdditional: Number(timeAdditional),
      timeTotal: Number(
        Number(timePrep) + Number(timeCook) + Number(timeAdditional)
      ),
      servings: Number(servings),
      ingredients: ingredients,
      listIngredientsNames: listIngredientsNamesArray,
      tipsTricks: tipsTricks,
      preparation: preparation,
      howToCook: howToCook,
      allergens: allergens,
      events: events,
      video: video,
      carbs: Number(carbs),
      sugars: Number(sugars),
      protein: Number(protein),
      fat: Number(fat),
      fibre: Number(fibre),
      kcal: Number(kcal),
      salt: Number(salt),
      saturates: Number(saturates),
    };

    try {
      setIsLoading(true);
      createListIngredientsNamesArray();
      const request = axios
        .put(`/api/recipes/${recipe?.id}`, updatedData)
        .then(() => {
          toast.success("Recipe updated!");
          setStep(STEPS.LEGAL);
          recipeModalUpdate.onClose();
        })
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setIsLoading(false);
          router.push(`/recipes/${recipe?.id}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.NUTRI) {
      return "Update";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LEGAL) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let modalTitle = recipe?.name;

  let bodyContent = (
    <div className="flex flex-col gap-8 cursor-default">
      <Heading
        title="Legal police info!"
        subtitle="Important Notice: When updating it's imperative to navigate within the boundaries of plagiarism laws.We kindly advise you to be vigilant and conscientious throughout your creative process.While recipes may not always have a single owner, the way to describe and cook it can be relate to one person.Prioritize expressing your ideas in your own words, even when referencing external sources. This not only respects the law but also showcases your creativity. Remember, ethical content creation not only safeguards you legally but also fosters a community of respect for intellectual property. Let's collaborate to maintain a positive environment where creativity and integrity flourish."
      />
    </div>
  );

  if (step === STEPS.NAME) {
    modalTitle = "Recipe name";
    bodyContent = (
      <div>
        <StepName
          currentUser={currentUser}
          name={name}
          register={register}
          setCustomValue={setCustomValue}
          isLoading={isLoading}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    modalTitle = "Recipe description";
    bodyContent = (
      <div>
        <StepDescription
          currentUser={currentUser}
          description={description}
          register={register}
          setCustomValue={setCustomValue}
          isLoading={isLoading}
        />
      </div>
    );
  }

  if (step === STEPS.TYPE) {
    modalTitle = "Recipe courses & types";
    bodyContent = (
      <div>
        <StepType
          currentUser={currentUser}
          type={type}
          setCustomValue={setCustomValue}
        />
      </div>
    );
  }

  if (step === STEPS.DIET) {
    modalTitle = "Recipe diets";
    bodyContent = (
      <div>
        <StepDiet
          currentUser={currentUser}
          diet={diet}
          setCustomValue={setCustomValue}
        />
      </div>
    );
  }

  if (step === STEPS.CUISINE) {
    modalTitle = "Recipe cuisine from";
    bodyContent = (
      <div>
        <StepCuisine
          currentUser={currentUser}
          cuisine={cuisine}
          setCustomValue={setCustomValue}
        />
      </div>
    );
  }

  if (step === STEPS.SEASON) {
    modalTitle = "Recipe seasons";
    bodyContent = (
      <div>
        <StepSeason
          currentUser={currentUser}
          season={season}
          setCustomValue={setCustomValue}
        />
      </div>
    );
  }

  if (step === STEPS.METHOD) {
    modalTitle = "Recipe Methods";
    bodyContent = (
      <div>
        <StepMethod
          currentUser={currentUser}
          method={method}
          setCustomValue={setCustomValue}
        />
      </div>
    );
  }

  if (step === STEPS.TIME) {
    modalTitle = "Recipe times";
    bodyContent = (
      <div>
        <StepTime
          currentUser={currentUser}
          timeCook={timeCook}
          timePrep={timePrep}
          timeAdditional={timeAdditional}
          servings={servings}
          register={register}
          setCustomValue={setCustomValue}
          isLoading={isLoading}
        />
      </div>
    );
  }

  if (step === STEPS.INGREDIENTS) {
    modalTitle = "Recipe ingredients";
    bodyContent = (
      <div>
        <StepIngredients
          currentUser={currentUser}
          ingredients={ingredients}
          isLoading={isLoading}
          setCustomValue={setCustomValue}
        />
      </div>
    );
  }

  if (step === STEPS.TIPS) {
    modalTitle = "Recipe tips & tricks";
    bodyContent = (
      <div>
        <StepTipsTricks
          currentUser={currentUser}
          tipsTricks={tipsTricks}
          isLoading={isLoading}
          setCustomValue={setCustomValue}
        />
      </div>
    );
  }

  if (step === STEPS.PREP) {
    modalTitle = "Recipe preparation steps";
    bodyContent = (
      <div>
        <StepPreparation
          currentUser={currentUser}
          preparation={preparation}
          isLoading={isLoading}
          setCustomValue={setCustomValue}
        />
      </div>
    );
  }

  if (step === STEPS.COOK) {
    modalTitle = "Recipe cooking steps";
    bodyContent = (
      <div>
        <StepHowToCook
          currentUser={currentUser}
          howToCook={howToCook}
          isLoading={isLoading}
          setCustomValue={setCustomValue}
        />
      </div>
    );
  }

  if (step === STEPS.ALLERGENS) {
    modalTitle = "Recipe allergens";
    bodyContent = (
      <div>
        <StepAllergens
          currentUser={currentUser}
          allergens={allergens}
          setCustomValue={setCustomValue}
        />
      </div>
    );
  }

  if (step === STEPS.EVENTS) {
    modalTitle = "Recipe events time";
    bodyContent = (
      <div>
        <StepEvents
          currentUser={currentUser}
          events={events}
          setCustomValue={setCustomValue}
        />
      </div>
    );
  }

  const deleteImages = async (imageUrlToDelete: string[]): 
  Promise<AxiosResponse | null> => {
    let publicIds: string[] = []
    imageUrlToDelete.forEach(url => {
      // @ts-ignore
      publicIds.push(url.split("/").pop().split(".")[0])
    });
    try {
      const deleteResponse = await axios.delete("/api/upload", {
        data: { publicIds: publicIds },
      });
  
      if (deleteResponse.status === 200) {
        console.log("Deletion success:", deleteResponse.data);
        return deleteResponse;
      } else {
        console.error("Failed to delete images");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const updateImagesSrc = async (imageFileToAdd: File[]): Promise<AxiosResponse | null> => {
    deleteImages(imageUrlToDelete);
    try {
      const formData = new FormData();
      imageFileToAdd.forEach((image) => {
        formData.append("images", image);
      });
  
      const uploadResponse = await axios.post("/api/upload", formData);
  
      if (uploadResponse.status === 200) {
        
        uploadResponse.data.uploadResponses.forEach((response: any, index: number) => {
          imageSrc.push(response.secure_url);
        });
        console.log(imageSrc)
        return uploadResponse;
      } else {
        console.error("Failed to upload images");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  if (step === STEPS.PHOTO) {
    modalTitle = "Recipe main photo";
    bodyContent = (
      <div>
        <StepPhotos
          currentUser={currentUser}
          imageSrc={imageSrc}
          imageFileToAdd={imageFileToAdd}
          imageUrlToDelete={imageUrlToDelete}
          setCustomValue={setCustomValue}
        />
        <button onClick={() => deleteImages(imageUrlToDelete)}>delete</button>
        <button onClick={() => updateImagesSrc(imageFileToAdd)}>upload</button>
      </div>
    );
  }

  if (step === STEPS.VIDEO) {
    modalTitle = "Recipe video";
    bodyContent = (
      <div>
        <StepVideo
          currentUser={currentUser}
          video={video}
          register={register}
          setCustomValue={setCustomValue}
          isLoading={isLoading}
        />
      </div>
    );
  }

  if (step === STEPS.NUTRI) {
    modalTitle = "Recipe nutritional info";
    bodyContent = (
      <div>
        <StepNutricion
          currentUser={currentUser}
          carbs={carbs}
          sugars={sugars}
          protein={protein}
          fat={fat}
          fibre={fibre}
          kcal={kcal}
          salt={salt}
          saturates={saturates}
          register={register}
          setCustomValue={setCustomValue}
          isLoading={isLoading}
        />
      </div>
    );
  }

  return (
    <Modal
      count={step + 1}
      disabled={isLoading}
      isOpen={recipeModalUpdate.isOpen}
      title={modalTitle}
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LEGAL ? undefined : onBack}
      onClose={recipeModalUpdate.onClose}
      body={bodyContent}
    />
  );
};

export default RecipeModalCreate;
