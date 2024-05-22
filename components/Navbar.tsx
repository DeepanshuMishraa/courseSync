"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './ui/button';
import { Divide, Menu, MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Toggle1 } from './ui/toggle-no-dropdown';
import { Avatar } from './ui/avatar';
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Avatar1 } from './Dashboard/Avatar';

const Navbar = () => {
  return (
    <>
      <DesktopNavbar/>
      <MobileNavbar/>
    </>
  );
};


function MobileNavbar(){
    const [isOpen,setIsOpen] = useState(false);
    return(
        <div className='block border-separate bg-background md:hidden'>
            <nav className='container flex items-center justify-between px-8'>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant={"ghost"} size={"icon"} >
                            <Menu/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[300px] sm:w-[540px]" side="left">
                        <Link href="/" className='text-3xl  border-b border-separate dark:border-white font-bold text-center'>CourseSync</Link>
                        <div className='mt-8 flex flex-col space-y-4 text-2xl font-medium'>
                          <Link href="/register" className='hover:scale-105 duration-200'>Create an account</Link>
                          <Link href="/dashboard" className='hover:scale-105 duration-200' >Dashboard</Link>
                          <div className='flex flex-col'>
                            <h1>Quick Links</h1>
                            <ul className='ml-4 mt-4 flex flex-col space-y-2'>
                              <li className='hover:scale-105 duration-200'><Link href="/about">About</Link></li>
                              <li className='hover:scale-105 duration-200 text-blue-600'><Link href="/docs" >Docs</Link></li>
                              <li className='hover:scale-105 duration-200'><Link  href="https://deepanshumishra.vercel.app">About Dev</Link></li>

                            </ul>
                          </div>
                          <div className='flex-col flex'>
                            <h1  className='mt-4 hover:scale-105 duration-200'>Contact Us</h1>
                            <ul className='mt-2 '>
                            <li><Link className='mt- ml-2 hover:scale-105 duration-200 text-blue-700' href="mailto:teamcoursesync@mail.com">Email us</Link></li>
                            </ul>
                          </div>

                          <div className="mt-4 border-t">
                <h1 className='text-center'>Socials</h1>
                <div className="flex mt-6 items-center justify-center space-x-4">
                    <Link className="hover:text-blue-600 duration-200" href="/"><FaInstagram size={30}/></Link>
                    <Link className="hover:text-blue-600 duration-200" href="/"><FaTwitter size={30}/></Link>
                    <Link className="hover:text-blue-600 duration-200" href="/"><FaGithub size={30}/></Link>
                </div>
            </div>
            <div className='border-t items-center flex justify-center '>
              <p className='mt-6'>&copy; 2024 CourseSync</p>
            </div>

                        </div>
      
                    </SheetContent>
                </Sheet>
                <div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
                  <Link href="/" className='text-3xl font-bold text-center'>CourseSync</Link>
                </div>
                <div className='flex items-center justify-end gap-2'>
                    <Toggle1/>
                </div>
            </nav>
        </div>
    )
}
const items = [
  {
    label: "Dashboard", link: "/dashboard"
  },
  {
    label: "Register", link: "/register"
  },
];

function DesktopNavbar(){
    return(
        <div className='hidden border-separate border-b  bg-background md:block'>
          <div className='w-full flex justify-between items-center'>
            <Link href="/" className='text-4xl font-bold p-4'>CourseSync</Link>
            <div className='flex justify-end items-center font-medium m-5 gap-3'>
              <Toggle1/>
              <Link href="/dashboard" className='text-xl hover:scale-105 duration-200'>Dashboard</Link>
              <Link href="/register" className='text-xl hover:scale-105 duration-200'>Register</Link>
          </div>
          </div>
        </div>
    );
}

// function NavbarItem({link,label,onClick}: {
//     link: string;
//     label: string;
//     onClick? : ()=>void
// }){
//     const pathName = usePathname();
//     const isActive = pathName === link;

//     return(
//         <div className='relative flex'>
//             <Link href={link}
//             >{label}</Link>
//             {isActive && (
//                 <div className='absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block'></div>
//             )}
//         </div>
//     );
// }

export default Navbar;
