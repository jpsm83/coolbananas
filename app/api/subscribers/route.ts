import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function GET(request: Request) {
  try {
    const dbSubscribers = await prisma.subscribers.findUnique({
      where: {
        id: "6558b04d1ecf841b01dc1257",
      },
    });

    const subscribersEmail = dbSubscribers?.subscribersEmail;

    if (subscribersEmail) {
      return NextResponse.json(subscribersEmail);
    } else {
      return NextResponse.json({ message: "No subscribers yet!" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const userEmail = body.email;

    if (!userEmail || typeof userEmail !== "string") {
      throw new Error("Invalid user email!");
    }

    const alreadySubscribed = await prisma.subscribers.findMany({
      where: {
        AND: [
          { id: "6558b04d1ecf841b01dc1257" },
          { subscribersEmail: { hasSome: [userEmail] } },
        ],
      },
    });

    if (alreadySubscribed.length === 0) {
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
    } else {
      return NextResponse.json({ message: "already subscribed" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const userEmail = body.email;

    if (!userEmail || typeof userEmail !== "string") {
      throw new Error("Invalid user email!");
    }

    const alreadySubscribed = await prisma.subscribers.findMany({
      where: {
        AND: [
          { id: "6558b04d1ecf841b01dc1257" },
          { subscribersEmail: { hasSome: [userEmail] } },
        ],
      },
    });

    if (alreadySubscribed.length > 0) {
      const dbSubscribers = await prisma.subscribers.findUnique({
        where: {
          id: "6558b04d1ecf841b01dc1257",
        },
      });

      // Extract the existing subscribersEmail array or initialize an empty array
      const existingSubscribersEmail = dbSubscribers?.subscribersEmail || [];

      // Update the subscriber with the new subscribersEmail array
      const newSubscribersArray = existingSubscribersEmail.filter(
        (email) => email !== userEmail
      );

      // Update the subscriber with the new subscribersEmail array
      await prisma.subscribers.update({
        where: {
          id: "6558b04d1ecf841b01dc1257",
        },
        data: {
          subscribersEmail: {
            set: newSubscribersArray,
          },
        },
      });

      return NextResponse.json(newSubscribersArray);
    } else {
      // The user is not subscribed, return a response indicating this
      return NextResponse.json({ message: "User not subscribed" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
