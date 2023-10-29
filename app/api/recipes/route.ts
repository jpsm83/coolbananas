import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(request: Request) {
  try {
    const recipes = await prisma.recipe.findMany();
    return NextResponse.json(recipes);
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
1
    const body = await request.json();

    const recipe = await prisma.recipe.create({
      data: {
        authorId: currentUser.id,
        ...body,
      },
    });

    return NextResponse.json(recipe);
  } catch (error) {
    return NextResponse.error();
  }
}