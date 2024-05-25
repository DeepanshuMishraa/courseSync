"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../ui/dark-mode-toggle";
import { Toggle1 } from "../ui/toggle-no-dropdown";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";
import Profile from "../../public/profile.png"
import { useState } from "react";
import { Separator } from "../ui/separator";
import { CommandMenu } from "../Search";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { Avatar1 } from "./Avatar";


const DashNav = ()=>{
  return(
    <>
    <DesktopNav/>
    <MobileNav/>
    </>
  )
}


const MobileNav = ()=>{
  const [isOpen,setIsOpen] = useState(false);
  const [openAvatar,setOpenAvatar] = useState(false);
  const session = useSession();
  return(
    <div className="lg:hidden  flex justify-between">
      <div className="flex items-center">
        <Link href="/" className="font-bold text-2xl p-2">
        CourseSync
      </Link>
      </div>
    <div className="flex items-end gap-2 justify-end p-2">
        <CommandMenu/>
        <Toggle1/>
        <Button onClick={()=>setOpenAvatar(!openAvatar)} className="bg-transparent" variant={null}>
        <Avatar1/>
        </Button>
        {openAvatar && <div className="absolute top-16 right-4 rounded-lg bg-black  shadow-lg p-4">
        <div className="flex flex-col justify-center items-center text-white">
                <h1 className="text-lg">Welcome {session?.data?.user?.username}</h1>
                <Separator/>
                <Link href="/add-friend">Add Friend</Link>
                <Separator/>
                <Link href="/friends">Friends</Link>
                <Separator/>
                <button onClick={()=>signOut({
        redirect:true,
        callbackUrl:`${window.location.origin}/login`
      })}>Logout</button>
            </div>
          </div>}
      </div>
    </div>
  )
}

const DesktopNav = () => {

    const session = useSession();
    const [isToggle,setIsToggle] = useState(false);

  return (
    <div className="w-full h-10 max-lg:hidden flex justify-between items-center p-8">
      <Link href="/" className="font-bold text-4xl">
        CourseSync
      </Link>
      <div className="flex items-center gap-4">
      <CommandMenu/>
        <Toggle1/>
      <div className="rounded-full object-cover">
        <button onClick={()=>setIsToggle(!isToggle)} className="rounded-full object-cover bg-transparent">
        <Image alt="Profile" src={Profile}
        width={40}
        height={40}
        className="rounded-full cursor-pointer hover:scale-105 duration-200"
        />
        </button>

        {isToggle && <div className="absolute top-16 right-0 rounded-lg bg-gray-600 shadow-lg p-4">
            <div className="flex flex-col justify-center items-center text-white">
                <h1 className="text-lg">Welcome {session?.data?.user?.username}</h1>
                <Separator/>
                <Link href="/update">Settings</Link>
                <Separator/>
                <Link href="/friends">Friends</Link>
                <Separator/>
                <button onClick={()=>signOut({
        redirect:true,
        callbackUrl:`${window.location.origin}/login`
      })}>Logout</button>
            </div>
            </div>}

      </div>
      </div>
    </div>
  );
};

export default DashNav;