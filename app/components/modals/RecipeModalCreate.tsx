"use client";

import axios, { AxiosResponse } from "axios";
import useRecipeModalCreate from "@/app/hooks/useRecipeModalCreate";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import StepName from "./recipes_popups/StepName";
import StepDescription from "./recipes_popups/StepDescription";
import StepType from "./recipes_popups/StepType";
import StepDiet from "./recipes_popups/StepDiet";
import StepCuisine from "./recipes_popups/StepCuisine";
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
import { SafeUser } from "@/app/types";

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
  currentUser: SafeUser | null | undefined;
}

const RecipeModalCreate: React.FC<RecipeModalCreateProps> = ({
  currentUser,
}) => {
  const router = useRouter();
  const recipeModalCreate = useRecipeModalCreate();
  const [step, setStep] = useState(STEPS.LEGAL);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FieldValues>({
      defaultValues: {
        name: "",
        description: "",
        imageSrc: [],
        imageFileToAdd: [],
        type: [],
        diet: [],
        cuisine: {},
        country: "",
        season: [],
        method: [],
        timePrep: "",
        timeCook: "",
        timeAdditional: "",
        servings: "",
        ingredients: [],
        listIngredientsNames: [],
        tipsTricks: [],
        preparation: [],
        howToCook: [],
        allergens: [],
        events: [],
        video: "",
        carbs: "",
        sugars: "",
        protein: "",
        fat: "",
        fibre: "",
        kcal: "",
        salt: "",
        saturates: "",
      },
    });

  const name = watch("name");
  const description = watch("description");
  const imageSrc = watch("imageSrc");
  const imageFileToAdd = watch("imageFileToAdd");
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
    if (step === STEPS.NAME && !name) {
      toast.error("Your recipes needs a name!");
      return;
    }
    if (step === STEPS.DESCRIPTION && !description) {
      toast.error("Describe your recipe!");
      return;
    }
    if (step === STEPS.TYPE && type.length === 0) {
      toast.error("Select at least one type!");
      return;
    }
    if (step === STEPS.DIET && diet.length === 0) {
      toast.error("Select at least one diet!");
      return;
    }
    if (step === STEPS.CUISINE && !cuisine.value) {
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
    if (step === STEPS.TIPS && tipsTricks.length === 0) {
      toast.error("Add some tips & tricks or comment!");
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
    if (
      step === STEPS.PHOTO &&
      imageSrc.length === 0 &&
      imageFileToAdd.length === 0
    ) {
      toast.error("Add at least one photo!");
      return;
    }
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

  const createImagesSrc = async (
    imageFileToAdd: File[]
  ): Promise<AxiosResponse | null> => {
    try {
      const formData = new FormData();
      imageFileToAdd.forEach((image) => {
        formData.append("images", image);
      });
      const uploadResponse = await axios.post("/api/upload", formData, {
      })
      if (uploadResponse.status === 200) {
        uploadResponse.data.uploadResponses.forEach(
          (response: any, index: number) => {
            imageSrc.push(response.secure_url);
          }
        );
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.NUTRI) {
      return onNext();
    }

    await createImagesSrc(imageFileToAdd);

    let listIngredientsNamesArray: string[] = [];

    const createListIngredientsNamesArray = () => {
      ingredients.forEach((ingredient: { name: string }) => {
        const sanitazeNames = ingredient.name.toLowerCase();
        listIngredientsNamesArray.push(sanitazeNames);
      });
    };

    const createData = {
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
        .post("/api/recipes", createData)
        .then((response) => {
          toast.success("Recipe created!");
          reset();
          setStep(STEPS.LEGAL);
          recipeModalCreate.onClose();
          router.refresh();
          router.push(`/recipes/${response.data.id}`);
        })
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.NUTRI) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LEGAL) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let modalTitle = "Create a recipe!";

  let bodyContent = (
    <div className="flex flex-col gap-8 cursor-default">
      <Heading
        title="Legal police info!"
        subtitle="Important Notice: Creating content is an exciting endeavour, but it's imperative to navigate within the boundaries of plagiarism laws.We kindly advise you to be vigilant and conscientious throughout your creative process.While recipes may not always have a single owner, the way to describe and cook it can be relate to one person.Prioritize expressing your ideas in your own words, even when referencing external sources. This not only respects the law but also showcases your creativity. Remember, ethical content creation not only safeguards you legally but also fosters a community of respect for intellectual property. Let's collaborate to maintain a positive environment where creativity and integrity flourish."
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

  if (step === STEPS.PHOTO) {
    modalTitle = "Recipe photos";
    bodyContent = (
      <div>
        <StepPhotos
          currentUser={currentUser}
          imageSrc={imageSrc}
          imageFileToAdd={imageFileToAdd}
          setCustomValue={setCustomValue}
        />
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
      isOpen={recipeModalCreate.isOpen}
      title={modalTitle}
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LEGAL ? undefined : onBack}
      onClose={recipeModalCreate.onClose}
      body={bodyContent}
    />
  );
};

export default RecipeModalCreate;
