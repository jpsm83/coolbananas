import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(request: Request) {
  try {
    const user = await prisma.user.findMany();
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.error();
  }
}
