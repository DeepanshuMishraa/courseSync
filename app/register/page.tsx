"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast, useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Link from "next/link"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }),
})

export default function Register() {
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      form.reset();
      setLoading(true)
      const res = await axios.post("/api/register", data)

      if (res.status === 201 || res.status === 200) {
        console.log("success")
        router.push("/login")
      }
    } catch (e) {
      setError("Something went wrong. Please try again.")
      console.log("error", e)
    } finally {
      setLoading(false)
    }


  }

  return (
    <>
      <Navbar />
      <div className="h-screen flex items-center justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-4 p-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-10 dark:text-white text-black">Register</h1>
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe18" {...field} />
                  </FormControl>
                  <FormDescription className="text-blue-700">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@mail.com" {...field} />
                  </FormControl>
                  <FormDescription className="text-blue-600">
                    We will never share your email with anyone else.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormDescription className="text-blue-600">
                    Password must be at least 8 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" disabled={loading}>
  {loading ? (
    <div className="flex items-center">
    <svg
        className="animate-spin h-5 w-5 mr-3 text-white dark:text-black"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Processing
    </div>
  ) : (
    "Register"
  )}
</Button>
<FormDescription className="text-xl text-center">not a member? <Link href="/login" className="text-blue-700 underline">Login</Link></FormDescription>
          </form>
          <div></div>
        </Form>
      </div>
    </>
  )
}


