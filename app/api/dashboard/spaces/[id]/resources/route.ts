import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const spaceId = parseInt(params.id, 10);

  try {
    const resources = await prisma.resource.findMany({
      where: { spaceId },
      include: { pages: true },
    });

    return NextResponse.json(resources, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const reqBody = await req.json();
  const { name } = reqBody;

  if (!name) {
    return NextResponse.json({
      message: "Missing required fields",
      status: 400,
    });
  }

  if (!session) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const spaceId = parseInt(params.id, 10);

  try {
    const resource = await prisma.resource.create({
      data: {
        name,
        spaceId,
      },
    });

    return NextResponse.json(resource, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
