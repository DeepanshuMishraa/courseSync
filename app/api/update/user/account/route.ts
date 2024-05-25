import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const currentUsername = session.user.username;
  const reqBody = await req.json();
  console.log("Request Body:", reqBody); // Log the request body

  const { name, updatedUsername } = reqBody;

  if (!name || !updatedUsername) {
    return NextResponse.json(
      { message: "Name and updated username are required" },
      { status: 400 }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username: updatedUsername },
    });

    if (existingUser && updatedUsername !== currentUsername) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { username: currentUsername },
      data: {
        username: updatedUsername,
        name,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (e) {
    console.error("Error updating user:", e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
