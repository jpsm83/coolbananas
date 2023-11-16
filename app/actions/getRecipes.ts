import prisma from "@/app/libs/prismadb";
import { SafeUser } from "../types";

interface RecipeQuery {
  type?: string[]; // Add other properties as needed
  diet?: string[];
  country?: string;
  season?: string[];
  method?: string[];
  time?: string;
  ingredients?: string[];
  allergens?: string[];
  events?: string[];
  ratings?: string;
}

export default async function getRecipes({
  query,
  page = 1,
  limit = 2,
  currentUser,
  myCreations = false,
  favorites = false,
}: {
  query?: RecipeQuery;
  page?: number;
  limit?: number;
  currentUser?: SafeUser | null | undefined;
  myCreations?: boolean;
  favorites?: boolean;
}) {
  const skip = (page - 1) * limit;

  const typeOptions = query?.type ? query.type : undefined;
  const dietOptions = query?.diet ? query.diet : undefined;
  const countryOptions = query?.country ? query.country : undefined;
  const seasonOptions = query?.season ? query.season : undefined;
  const methodOptions = query?.method ? query.method : undefined;
  const timeOptions = query?.time ? Number(query.time) : 5000;
  const ingredientsOptions = query?.ingredients ? query.ingredients : undefined;
  const allergensOptions = query?.allergens ? query.allergens : undefined;
  const eventsOptions = query?.events ? query.events : undefined;
  const ratingsOptions = query?.ratings ? query.ratings : undefined;

  try {
    let filters = {}; // Initialize an empty where clause

    if (myCreations) {
      // Add the type filter if typeOptions exists
      filters = {
        ...filters, // Merge existing filters
        authorId: currentUser?.id,
      };
    }

    if (favorites) {
      // Add the type filter if typeOptions exists
      filters = {
        ...filters, // Merge existing filters
        id: {
          in: currentUser?.favoriteIds,
        },
      };
    }

    if (typeOptions) {
      // Add the type filter if typeOptions exists
      filters = {
        ...filters, // Merge existing filters
        type: {
          hasEvery: typeOptions,
        },
      };
    }

    if (dietOptions) {
      // Add the diet filter if dietOptions exists
      filters = {
        ...filters, // Merge existing filters
        diet: {
          hasEvery: dietOptions,
        },
      };
    }

    if (countryOptions) {
      // Add the cuisine filter if countryOptions exists
      filters = {
        ...filters, // Merge existing filters
        country: {
          equals: countryOptions[0],
        },
      };
    }

    if (seasonOptions) {
      // Add the diet filter if seasonOptions exists
      filters = {
        ...filters, // Merge existing filters
        season: {
          hasEvery: seasonOptions,
        },
      };
    }

    if (methodOptions) {
      // Add the diet filter if methodOptions exists
      filters = {
        ...filters, // Merge existing filters
        method: {
          hasEvery: methodOptions,
        },
      };
    }

    if (timeOptions) {
      // Add the time filter if timeOptions exists
      filters = {
        ...filters, // Merge existing filters
        timeTotal: {
          lte: Number(timeOptions),
        },
      };
    }

    if (ingredientsOptions) {
      filters = {
        ...filters,
        listIngredientsNames: {
          hasEvery: ingredientsOptions,
        },
      };
    }

    if (allergensOptions) {
      // Add the diet filter if allergensOptions exists
      filters = {
        ...filters, // Merge existing filters
        method: {
          hasEvery: allergensOptions,
        },
      };
    }

    if (eventsOptions) {
      // Add the diet filter if eventsOptions exists
      filters = {
        ...filters, // Merge existing filters
        method: {
          hasEvery: eventsOptions,
        },
      };
    }

    if (ratingsOptions) {
      // Add the diet filter if dietOptions exists
      filters = {
        ...filters, // Merge existing filters
        rateAvg: {
          gte: Number(ratingsOptions),
        },
      };
    }

    const recipesLength = await prisma.recipe.findMany({
      where: filters,
    });

    const recipes = await prisma.recipe.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        reviews: true,
      },
      where: filters, // Use the constructed where clause
      skip,
      take: limit,
    });

    const safeRecipes = recipes.map((recipe) => ({
      ...recipe,
      createdAt: recipe.createdAt.toISOString(),
      updatedAt: recipe.updatedAt?.toISOString(),
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
    }));

    return { safeRecipes, recipesQty: recipesLength.length };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
