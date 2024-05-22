import { Quicksand } from "next/font/google"
import { TextShimmerDemo } from "./Text-shimmer"
import { AnimatedGradientTextDemo } from "./GradientText"
import { AnimatedListDemo } from "./List"


const quicksand = Quicksand({subsets: ["latin"]})

const NewHero = () => {
  return (

    <div className="h-screen  bg-gradient-to-b from-purple-800 via-blue-900 to-purple-500">
    <AnimatedGradientTextDemo/>
        <div className="flex justify-center">
    <h1 className={`scroll-m-10  p-2 ${quicksand.className} font-extrabold  text-3xl text-center tracking-tight mt-6 lg:text-4xl`}>
      Where students meet, <span className="text-center max-lg:ml-6">to communicate</span>
    </h1>
    </div>
    <div className="flex mt-6 items-center justify-center">
     <AnimatedListDemo/>
    </div>
    </div>
  )
}

export default NewHero
