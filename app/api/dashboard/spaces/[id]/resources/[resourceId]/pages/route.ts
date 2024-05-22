import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { resourceId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const resourceId = parseInt(params.resourceId, 10);

  try {
    const pages = await prisma.page.findMany({
      where: { resourceId },
    });

    return NextResponse.json(pages, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { resourceId: string } }
) {
  const session = await getServerSession(authOptions);
  const reqBody = await req.json();
  const { title, content, notes } = reqBody;

  if (!session) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  if (!content || !title) {
    return NextResponse.json({
      message: "Missing required fields",
      status: 400,
    });
  }

  const resourceId = parseInt(params.resourceId, 10);

  try {
    // Check if the resource exists
    const resource = await prisma.resource.findUnique({
      where: { id: resourceId },
    });

    if (!resource) {
      return NextResponse.json({
        message: "Resource not found",
        status: 404,
      });
    }

    const page = await prisma.page.create({
      data: {
        title,
        content,
        notes,
        resourceId,
      },
    });

    return NextResponse.json(page, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}