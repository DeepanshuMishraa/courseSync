"use client"
import DashNav from "@/components/Dashboard/DashNav";
import { Button } from "@/components/ui/button";
import { CreateSpace } from "@/components/Dashboard/CreateSpace";
import axios from "axios";
import { useEffect, useState } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Spinner from "@/components/Spinner";

interface Space {
  id: number;
  name: string;
  course: string;
  description: string;
  userId: number;
}

export default function Dashboard() {
  const [spaces, setSpaces] = useState<Space[] | null>(null);
  const [showCreateSpace, setShowCreateSpace] = useState(false);

  useEffect(() => {
    async function fetchSpaces() {
      try {
        const res = await axios.get("/api/dashboard/spaces");
        setSpaces(res.data);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    }
    fetchSpaces();
  }, []);

  const handleCreateSpace = () => {
    setShowCreateSpace(true);
  };

  const handleCancelCreateSpace = () => {
    setShowCreateSpace(false);
  };

  return (
    <>
      <DashNav />
      {spaces === null ? (
        <Spinner/>
      ) : (
        <>
          {!showCreateSpace && (
            <>
              <div className="flex justify-end m-2">
                <Button className="p-3" onClick={handleCreateSpace}>
                  Create New Space
                </Button>
              </div>
              {spaces.length === 0 ? (
                <div className="flex items-center justify-center h-screen">
                  <CreateSpace />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4  mt-8 ml-4">
                  {spaces.map((space) => (
                    <Link key={space.id} href={`/dashboard/${space.id}`}>
                      <div className="p-4 border-2 border-gray-700 dark:border-gray-900 rounded-lg hover:scale-105 duration-100 flex flex-col">
                        <h2 className="text-xl text-center font-bold flex-grow-0 flex-shrink-0">
                          {space.name}
                        </h2>
                        <p className="text-start mt-4 text-md font-medium flex-grow-0 flex-shrink-0">
                          description- {space.description}
                        </p>
                        <p className="text-start mt-4 text-md font-medium flex-grow-0 flex-shrink-0">
                          course- {space.course}
                        </p>
                        <div className="flex-grow flex-shrink" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
          {showCreateSpace && (
            <div className="flex items-center justify-center h-screen">
              <CreateSpace
              onCancel={handleCancelCreateSpace}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}