import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicPaths = path === "/" || path === "/register" || path === "/login";

  if (publicPaths && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if(path === "/dashboard" && !token){
    return NextResponse.redirect(new URL("/login",req.nextUrl))
  }
  if (!publicPaths && !token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

export const config = {
  matcher: ["/register", "/dashboard", "/login"],
};
