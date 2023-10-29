import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const reports = await prisma.report.findMany();
    return NextResponse.json(reports);
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

    const { type, comment, recipeId } = body;

    if (!type || !comment || !recipeId) {
      throw new Error("Invalid body credentials!");
    }

    const reportRecipe = await prisma.report.create({
      data: {
        authorId: currentUser.id,
        ...body,
      },
    });

    return NextResponse.json(reportRecipe);
  } catch (error) {
    return NextResponse.error();
  }
}