import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  recipeId?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const userEmail = body.email;
    
    if (!userEmail || typeof userEmail !== "string") {
      throw new Error("Invalid user email!");
    }

    // Try to find the subscriber based on the user's email
    const dbSubscribers = await prisma.subscribers.findUnique({
      where: {
        id: "6558b04d1ecf841b01dc1257",
      },
    });

    // Extract the existing subscribersEmail array or initialize an empty array
    const existingSubscribersEmail = dbSubscribers?.subscribersEmail || [];

    // Update the array by adding the current user's email
    const updatedSubscriber = [...existingSubscribersEmail, userEmail];

    // Update the subscriber with the new subscribersEmail array
    const newSubscribersEmail = await prisma.subscribers.update({
      where: {
        id: "6558b04d1ecf841b01dc1257",
      },
      data: {
        subscribersEmail: {
          set: updatedSubscriber,
        },
      },
    });

    return NextResponse.json(updatedSubscriber);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

// export async function DELETE(
//   request: Request,
//   { params }: { params: IParams }
// ) {
//   try {
//     const currentUser = await getCurrentUser();

//     if (!currentUser) {
//       throw new Error("Current user not found!");
//     }

//     const { userEmail } = params;

//     if (!userEmail || typeof userEmail !== "string") {
//       throw new Error("Invalid recipe Id!");
//     }

//     let favoriteIds = [...(currentUser.favoriteIds || [])];

//     favoriteIds = favoriteIds.filter((id) => id !== userEmail);

//     const user = await prisma.user.update({
//       where: {
//         id: currentUser.id,
//       },
//       data: {
//         favoriteIds,
//       },
//     });

//     return NextResponse.json(user);
//   } catch (error) {
//     return NextResponse.error();
//   }
// }
