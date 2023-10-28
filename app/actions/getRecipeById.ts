// this is an action for a server component, not an api call

import prisma from "@/app/libs/prismadb";

interface IParams {
  recipeId?: string;
}

export default async function getRecipeById(params: IParams) {
  try {
    const { recipeId } = params;

    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
      include: {
        author: true,
        reviews: true,
      },
    });

    if (!recipe) {
      return null;
    }

    return {
      ...recipe,
      createdAt: recipe.createdAt.toString(),
      author: {
        ...recipe.author,
        createdAt: recipe.author.createdAt.toString(),
        updatedAt: recipe.author.updatedAt?.toString(),
        emailVerified: recipe.author.emailVerified?.toString() || null,
      },
      review: {
        ...recipe.reviews,
        createdAt: recipe.author.createdAt.toString(),
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
