import prisma from "@/app/libs/prismadb";

interface IParams {
  recipeId?: string;
}

export default async function getReviewsByRecipeId(params: IParams) {
  try {
    const { recipeId } = params;

    if (!recipeId) {
      throw new Error("Recipe ID is required");
    }

    const reviews = await prisma.review.findMany({
      where: {
        recipeId,
      },
      include: {
        author: true,
      },
    });

    const safeReviews = reviews.map((review) => ({
      ...review,
      createdAt: review.createdAt.toISOString(),
    }));

    return safeReviews;
  } catch (error: any) {
    throw new Error(`Failed to fetch reviews: ${error.message}`);
  }
}
