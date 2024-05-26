"use client";

import { useEffect, useState } from "react";
import DashNav from "@/components/Dashboard/DashNav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import axios from "axios";
import ContextMenuDemo from "@/components/Dashboard/Context-menu";
import WelcomeMessage from "@/components/Dashboard/WelcomeMessage";
import ChatComponent from "@/components/Chatter";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

interface Resource {
  id: number;
  name: string;
  spaceId: number;
  pages: Page[];
}

interface Page {
  id: number;
  title: string;
  content: string;
  notes: string;
  resourceId: number;
}

export default function SpacePage({ params }: { params: { id: string } }) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [name, setName] = useState("");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [showCreateResource, setShowCreateResource] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await axios.get(`/api/dashboard/spaces/${params.id}/resources`);
        setResources(res.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    }
    fetchResources();
  }, [params.id]);

  useEffect(() => {
    async function fetchPages() {
      if (selectedResource) {
        try {
          const res = await axios.get(`/api/dashboard/spaces/${params.id}/resources/${selectedResource.id}/pages`);
          setSelectedResource((prevResource) => ({
            ...prevResource!,
            pages: res.data,
          }));
        } catch (error) {
          console.error("Error fetching pages:", error);
        }
      }
      return;
    }
    fetchPages();
  },[params.id]);

  const handleCreateResource = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`/api/dashboard/spaces/${params.id}/resources`, { name });
      setResources((prevResources) => [...prevResources, res.data]);
      toast.success("Resource created successfully");
      setShowCreateResource(false);
      setName("");
    } catch (error) {
      toast.error("Error creating resource");
      console.error("Error creating resource:", error);
    }finally{
      setLoading(false);
    }
  };

  const handleCancelCreateResource = () => {
    setShowCreateResource(false);
  };

  return (
    <>
      <DashNav />
      <div className="flex">
        <div className="w-1/4 h-screen p-4 border-r">
          <Button onClick={() => setShowCreateResource(true)}>Create Resource</Button>
          <ul className="mt-4">
            {resources.map((resource) => (
              <li key={resource.id} className="flex flex-col items-start">
                <ContextMenuDemo
                  resource={resource}
                  resources={resources}
                  setResources={setResources}
                  selectedResource={selectedResource}
                  setSelectedResource={setSelectedResource}
                  params={params}
                  setSelectedPage={setSelectedPage}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 h-screen p-4">
          {selectedPage ? (
            <div>
              <h1 className="text-3xl text-blue-700 font-bold mb-4 text-center underline">{selectedPage.title}</h1>
              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-center underline text-blue-500">Content:</h2>
                <p className="text-lg p-2 mt-2">{selectedPage.content}</p>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-center text-blue-500 underline">Notes:</h2>
                <p className="text-lg p-2 mt-2">{selectedPage.notes}</p>
              </div>
            </div>
          ) : (
            <WelcomeMessage/>
          )}
        </div>
      </div>

      <Sheet open={showCreateResource} onOpenChange={setShowCreateResource}>
        <SheetContent side="right"> 
          <form onSubmit={handleCreateResource}>
            <h2 className="text-2xl font-bold mb-4">Create Resource</h2>
            <div className="grid gap-4">
              <label className="font-medium leading-none" htmlFor="resourceName">
                Resource Name
              </label>
              <input
                id="resourceName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded-md"
                placeholder="Enter resource name"
              />
              <div className="flex justify-end mt-4">
                <Button type="button" variant="secondary" onClick={handleCancelCreateResource}>
                  Cancel
                </Button>
                <Button type="submit" className="ml-2">
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
  "Create"
)}

                </Button>
              </div>
            </div>
          </form>
        </SheetContent>
      </Sheet>
      <Toaster/>
    </>
  );
}
