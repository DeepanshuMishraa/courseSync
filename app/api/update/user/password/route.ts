import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const username = session.user.username;

  const reqBody = await req.json();
  const { currentPassword, newPassword } = reqBody;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const passwordMatch = await bcryptjs.compare(
      currentPassword,
      user.password
    );

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Incorrect current password" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedNewPassword = await bcryptjs.hash(newPassword, salt);

    const updatedUser = await prisma.user.update({
      where: { username },
      data: {
        password: hashedNewPassword,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (e) {
    console.error("Error updating password:", e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
