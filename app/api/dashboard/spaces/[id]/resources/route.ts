import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const spaceId = parseInt(params.id, 10);
  const reqUrl = new URL(req.url);
  const resourceId = parseInt(
    reqUrl.searchParams.get("resourceId") as string,
    10
  );

  if (isNaN(resourceId)) {
    return NextResponse.json({ message: "Invalid resource ID", status: 400 });
  }

  try {
    // First, delete all pages associated with the resource
    await prisma.page.deleteMany({
      where: {
        resourceId,
      },
    });

    // Then, delete the resource
    await prisma.resource.delete({
      where: {
        id: resourceId,
      },
    });

    return NextResponse.json({ message: "Resource deleted", status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
