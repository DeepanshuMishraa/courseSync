"use client"
import Link from "next/link"
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa"


const Footer = ()=>{
    return (
        <>
        <DesktopFooter/>
        <MobileFooter/>
        </>
    )
}



const MobileFooter = ()=>{
    return(
        <div className="w-full md:hidden lg:hidden border-t border-black h-56">
        <div className=" mt-10">
            <h1 className="flex text-lg  font-bold items-center justify-center">&copy; CourseSync 2024</h1>
        </div>
        <div className="flex mt-10 space-x-4 justify-center ">
                    <Link className="hover:text-blue-600 duration-200" href="/"><FaInstagram size={30}/></Link>
                    <Link className="hover:text-blue-600 duration-200" href="https://x.com/@Deepanshudipxsy"><FaTwitter size={30}/></Link>
                    <Link  className="hover:text-blue-600 duration-200" href="https://github.com/DeepanshuMishraa/courseSync"><FaGithub size={30}/></Link>
                </div>
        </div>
    )
}

const DesktopFooter = () => {
  return (
    <div className="w-full h-52 md:h-30 lg:h-48  max-lg:hidden bg-transparent bottom-0 flex">
        <div className="flex ml-52 gap-10">
        <Link href="/" className="text-4xl p-4 mt-8">CourseSync</Link>
    <h1 className="text-lg p-4 mt-8">Quick Links
    <div className="flex flex-col mt-4">
        <a href="https://github.com/DeepanshuMishraa/courseSync" className="hover:text-blue-700 duration-150 cursor-pointer">Github</a>
        <a href="https://deepanshumishra.vercel.app" className="hover:text-blue-700 duration-150 cursor-pointer">About Dev</a>
        <a href="https://github.com/DeepanshuMishraa/courseSync/blob/master/README.md" className="hover:text-blue-700 duration-150 cursor-pointer">Docs</a>  
    </div>
    </h1>
        </div>
        <div className="mt-8 p-4 ml-16 flex flex-col">
            <h1>Contact Us</h1>
            <p className="hover:text-blue-700 duration-150 cursor-pointer">Email: mailto:coursesyncteam@gmail.com</p>
            <div className="mt-4">
                <h1>Socials</h1>
                <div className="flex mt-2 space-x-4">
                    <Link className="hover:text-blue-600 duration-200" href="/"><FaInstagram size={30}/></Link>
                    <Link className="hover:text-blue-600 duration-200" href="https://x.com/@Deepanshudipxsy"><FaTwitter size={30}/></Link>
                    <Link className="hover:text-blue-600 duration-200" href="https://github.com/DeepanshuMishraa/courseSync"><FaGithub size={30}/></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
