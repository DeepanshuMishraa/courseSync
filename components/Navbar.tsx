"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ui/dark-mode-toggle";
import { Toggle1 } from "./ui/toggle-no-dropdown";

const Navbar = () => {
  const pathname = usePathname();
  const isRegisterPage = pathname === "/register";

  return (
    <div className="w-full h-10 max-lg:hidden flex justify-between items-center p-8">
      <Link href="/" className="font-bold text-4xl">
        CourseSync
      </Link>
      <div className="flex items-center gap-4">
        <Toggle1 />
        <Link
          href={isRegisterPage ? "/login" : "/register"}
          className="font-sans text-xl hover:scale-105 duration-150"
        >
          {isRegisterPage ? "Login" : "Register"}
        </Link>
        <Link
          href="/dashboard"
          className="font-sans text-xl hover:scale-105 duration-150"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Navbar;