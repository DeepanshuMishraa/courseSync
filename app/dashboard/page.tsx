"use client"

import { CreateSpace } from "@/components/Dashboard/CreateSpace";
import DashNav from "@/components/Dashboard/DashNav";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth"
import { signOut } from "next-auth/react";



export default function Dashboard() {
  const spaces = [];
  return (
    <>
    <DashNav/>
    <div className="justify-center flex items-center h-screen">
      {spaces.length === 0 ? (<CreateSpace/>) : null}
    </div>
    </>
  );
}