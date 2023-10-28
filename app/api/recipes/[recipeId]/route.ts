import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  recipeId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Current user not found!");
    }

    const { recipeId } = params;

    if (!recipeId || typeof recipeId !== "string") {
      throw new Error("Invalid recipe Id!");
    }

    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    return NextResponse.json(recipe);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PUT(
  request: Request,
  { params, json }: { params: IParams; json: any }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Current user not found!");
    }
  
    const { recipeId } = params;
    
    if (!recipeId || typeof recipeId !== "string") {
      throw new Error("Invalid recipe Id!");
    }
  
    const body = await request.json();

    const currentRecipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });
  
    if (currentRecipe) {
      // @ts-ignore
      delete currentRecipe.id;
    }
  
    if (!currentRecipe) {
      throw new Error("Recipe not found!");
    }
  
    const updatedRecipe = {
      ...currentRecipe,
      ...body,
    };
  
    const updated = await prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: updatedRecipe,
    });
  
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Current user not found!");
    }

    const { recipeId } = params;

    if (!recipeId || typeof recipeId !== "string") {
      throw new Error("Invalid recipe Id!");
    }

    const deletedRecipe = await prisma.recipe.deleteMany({
      where: {
        id: recipeId,
        authorId: currentUser.id,
      },
    });

    return NextResponse.json(deletedRecipe);
  } catch (error) {
    return NextResponse.error();
  }
}
