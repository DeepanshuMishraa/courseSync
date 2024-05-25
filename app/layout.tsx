import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "./Providers";
import Footer from "@/components/Footer";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CourseSync",
  description: "Where Students meet,to communicate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader/>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        >
        <Providers>
        {children}
        </Providers>
        </ThemeProvider>

        </body>
    </html>
)
}
