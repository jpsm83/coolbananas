/* eslint-disable @next/next/no-img-element */
import getRecipeById from "@/app/actions/getRecipeById";
import { ImageResponse } from "next/server";

export const size = {
  width: 900,
  height: 450,
};

export const alt = "Cool Bananas Recipes Library";
export const contentType = "image/png";

interface IParams {
  recipeId: string;
}

export default async function og({ params }: { params: IParams }) {
  const recipe = await getRecipeById(params);

  return new ImageResponse(
    (
      <div tw="relative flex items-center justify-center">
        <img src={recipe?.imageSrc[0]} alt={recipe?.name} />
        <div tw="absolute flex bg-black opacity-50 inset-0 " />
        <div tw="absolute flex items-center top-2 w-full ">
          <p tw="text-white text-4xl flex font-bold m-5">{recipe?.name}</p>
          <p tw="text-indigo-200 text-xl flex font-bold m-5">{recipe?.author.name}</p>
          <p tw="text-purple-200 text-xl flex font-bold m-5">{recipe?.createdAt}</p>
        </div>
      </div>
    ),
    size
  );
}