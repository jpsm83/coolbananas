// this is a server component
// we cant use hooks to a server component
// thats why we are not using useRouter to navigate to recipes pages

import getCurrentUser from "@/app/actions/getCurrentUser";
import getRecipeById from "@/app/actions/getRecipeById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import RecipeClient from "./RecipeClient";
import getReviewsByRecipeId from "@/app/actions/getReviewsByRecipeId";
import getReportsByRecipeId from "@/app/actions/getReportsByRecipeId";
import { Metadata } from "next";

interface IParams {
  recipeId: string;
  reviewId?: string | null | undefined;
}

export async function generateMetadata({
  params,
}: {
  params: IParams;
}): Promise<Metadata> {
  try {
    const recipe = await getRecipeById(params);
    if (!recipe) {
      return {
        title: "Not found",
        description: "The page you are looking for does not exist!",
      };
    }
    return {
      title: recipe.name,
      description: recipe.description,
      alternates: {
        canonical: `/recipes/${recipe.id}`,
        languages: {
          "en-US": `/en-US/recipes/${recipe.id}`,
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      title: "Not found",
      description: "The page you are looking for does not exist!",
    };
  }
}

const RecipePage = async ({ params }: { params: IParams }) => {
  const recipe = await getRecipeById(params);
  const currentUser = await getCurrentUser();
  const reviews = await getReviewsByRecipeId(params);
  const reports = await getReportsByRecipeId(params);

  if (!recipe) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <RecipeClient
        //@ts-ignore
        recipe={recipe}
        currentUser={currentUser}
        reviews={reviews}
        reports={reports}
      />
    </ClientOnly>
  );
};

export default RecipePage;
