import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(request: Request) {
  const recipeId = request.url.split('recipeId=')[1]
    try {
      const reviews = await prisma.review.findMany({
        where: {
          recipeId: recipeId
        },
      });

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Current user not found!");
    }

    const body = await request.json();

    const { ratingValue, recipeId } = body;

    if (!ratingValue || !recipeId ) {
      throw new Error("Invalid body credentials!");
    }

    const reviewRecipe = await prisma.review.create({
      data: {
        authorId: currentUser.id,
        ...body
      },
    });

    return NextResponse.json(reviewRecipe);
  } catch (error) {
    return NextResponse.error();
  }
}
