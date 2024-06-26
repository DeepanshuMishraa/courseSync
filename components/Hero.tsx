"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { Button } from "./ui/button";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export function Hero() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-4xl font-bold text-black dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        Within CourseSync, where connections converge, learning transcends.knowledge feels distant{" "}
        <Highlight className="text-black dark:text-white">
        Each echo, a repetition, of a repetition, of a repetition.
        </Highlight>
        <div className="mt-4">
          <Link  href="/dashboard">
        <Button  className="p-4">Start the journey<FaArrowRight className="ml-2 hover:rotate-90 duration-200"/></Button>
        </Link>
        </div>
      </motion.h1>
    </HeroHighlight>
  );
}
