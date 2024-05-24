import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const username = session.user.username;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { spaces: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    return NextResponse.json(user.spaces, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const reqBody = await req.json();
  const { name, description, course } = reqBody;

  if (!name || !description || !course) {
    return NextResponse.json({
      message: "Missing required fields",
      status: 400,
    });
  }

  if (!session) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const username = session?.user.username;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    const space = await prisma.space.create({
      data: {
        name,
        description,
        course,
        user: {
          connect: { id: user.id },
        },
      },
    });

    return NextResponse.json(space, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
