import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

type RegisterRequestBody = {
  username: string;
  email: string;
  password: string;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const reqBody: RegisterRequestBody = await req.json();
    const { username, email, password } = reqBody;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 409 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        verified: false,
        otp,
      },
    });

    const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const emailContent = `
      Hi ${username},

      Thank you for signing up for our app!

      Please verify your email address by entering the following OTP:

      ${otp}

      This OTP is valid for 15 minutes.

      Sincerely,
      The CourseSync Team
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Verify Your Email for CourseSync",
      text: emailContent,
    });

    return NextResponse.json({
      message: "Registration successful. Please check your email for OTP.",
      status: 201,
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
