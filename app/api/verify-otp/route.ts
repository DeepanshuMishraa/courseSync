import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type VerifyOtpRequestBody = {
  email: string;
  otp: number;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, otp }: VerifyOtpRequestBody = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.otp !== Number(otp)) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    await prisma.user.update({
      where: { email },
      data: { verified: true, otp: null },
    });

    return NextResponse.json({
      message: "Email verified successfully",
      status: 200,
    });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
