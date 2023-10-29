import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || currentUser?.id !== "string") {
      throw new Error("Invalid current user Id!");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PUT(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Current user not found!");
    }

    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email) {
      throw new Error("Invalid body credentials!");
    }

    if (!emailRegex.test(email)) {
      throw new Error("Email regex fail!");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: currentUser?.id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    if (user) {
      // @ts-ignore
      delete user.id;
    }

    const updatedUser = {
      ...user,
      name,
      email,
      hashedPassword,
      updatedAt: new Date(),
    };

    const updated = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: updatedUser,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || typeof currentUser?.id !== "string") {
      throw new Error("Invalid current user Id!");
    }

    const deletedUser = await prisma.user.deleteMany({
      where: {
        id: currentUser?.id,
      },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.error();
  }
}