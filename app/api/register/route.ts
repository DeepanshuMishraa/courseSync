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

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Generate OTP (replace with your implementation)
    const otp = Math.floor(Math.random() * 100000) + 10000;

    // Create a new user with unverified status
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        verified: false, // User is not verified yet
      },
    });

    // Create email content
    const emailContent = `
      Hi ${username},

      Thank you for signing up for our app!

      Please verify your email address by entering the following OTP:

      ${otp}

      This OTP is valid for 15 minutes.

      Sincerely,

      The CourseSync Team
    `;

    const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

    // Send OTP email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

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
