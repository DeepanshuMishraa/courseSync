"use client";

import DashNav from "@/components/Dashboard/DashNav";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import axios from "axios";
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";

export default function UpdateUser() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [loading,setLoading] = useState(false);

    const handleInfoUpdate = async () => {
        console.log("Name:", name);
        console.log("Username:", username);

        if (!name || !username) {
            setError("Name and username are required");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.put("/api/update/user/account", { name, updatedUsername: username });
            toast.success("Username updated successfully");
            console.log(res.data);
        } catch (e) {
            toast.error("Error updating username");
            setError("Something went wrong");
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    const handlePasswordUpdate = async () => {
        console.log("Current Password:", currentPassword);
        console.log("New Password:", newPassword);

        if (!currentPassword || !newPassword) {
            setError("Both current and new passwords are required");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.put("/api/update/user/password", { currentPassword, newPassword });
            toast.success("Password updated successfully. Clear the browser cookie to login again.");
            console.log(res.data);
        } catch (e) {
            toast.error("Error updating password");
            setError("Something went wrong");
            console.log(e);
        }
    }

    return (
        <>
            <DashNav />
            <div className="flex items-center justify-center h-screen">
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account</CardTitle>
                                <CardDescription>
                                    Make changes to your account here. Click save when you&apos;re done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" onChange={(e) => setName(e.target.value)} placeholder="Johndoe" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" onChange={(e) => setUsername(e.target.value)} placeholder="@johndoe" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleInfoUpdate}>
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
  "Save changes"
)}

                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>
                                    Change your password here. After saving, you&apos;ll be logged out.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Current password</Label>
                                    <Input id="current" onChange={(e) => setCurrentPassword(e.target.value)} type="password" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">New password</Label>
                                    <Input id="new" onChange={(e) => setNewPassword(e.target.value)} type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handlePasswordUpdate}>
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
  "Save Password"
)}

                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <Toaster/>
        </>
    );
}
