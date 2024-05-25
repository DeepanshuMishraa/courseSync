"use client"

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import Link from "next/link"

  
  export function CommandMenu() {
    const [open, setOpen] = useState(false)
  
    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }
      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }, [])
  
    return (
        <>
        <div>
        <MagnifyingGlassIcon className="absolute top-5 ml-2 w-5 h-5"/>
        <Input placeholder="      Search..." onClick={()=>setOpen(true)}/>
        </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <Link className="cursor-pointer hover:text-blue-700" href="/dashboard"><CommandItem>Your spaces</CommandItem></Link>
            <Link className="cursor-pointer hover:text-blue-700" href="/dashboard/1"><CommandItem>Your Resources</CommandItem></Link>
            <Link href="/update"><CommandItem>Settings</CommandItem></Link>
            <CommandItem>Documentation</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      </>
    )
  }
  