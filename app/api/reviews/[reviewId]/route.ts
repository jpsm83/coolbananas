import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reviewId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Current user not found!");
    }

    const { reviewId } = params;

    if (!reviewId || typeof reviewId !== "string") {
      throw new Error("Invalid review Id!");
    }

    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
      include: {
        // @ts-ignore
        user: true, // Include the associated user data
      },
    });

    return NextResponse.json(review);
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

    const { reviewId } = params;

    if (!reviewId || typeof reviewId !== "string") {
      throw new Error("Invalid review Id!");
    }

    const body = await request.json();

    const currentReview = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (currentReview) {
      // @ts-ignore
      delete currentReview.id;
    }

    if (!currentReview) {
      throw new Error("Review not found!");
    }

    const updatedReview = {
      ...currentReview,
      ...body,
    };

    const updated = await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: updatedReview,
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

    const { reviewId } = params;

    if (!reviewId || typeof reviewId !== "string") {
      throw new Error("Invalid review Id!");
    }

    const deletedReview = await prisma.review.deleteMany({
      where: {
        id: reviewId,
        authorId: currentUser.id,
      },
    });

    return NextResponse.json(deletedReview);
  } catch (error) {
    return NextResponse.error();
  }
}