"use client";

import { useEffect, useState } from "react";
import DashNav from "@/components/Dashboard/DashNav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import axios from "axios";

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
  const [showCreateResource, setShowCreateResource] = useState(false);
  const [showCreatePage, setShowCreatePage] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [pageContent, setPageContent] = useState("");
  const [pageNotes, setPageNotes] = useState("");
  const [pageCreated, setPageCreated] = useState(false);

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
          setPageCreated(false); // Reset pageCreated after fetching pages
        } catch (error) {
          console.error("Error fetching pages:", error);
        }
      }
    }
    fetchPages();
  }, [params.id]);

  const handleCreateResource = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post(`/api/dashboard/spaces/${params.id}/resources`, { name });
      setResources((prevResources) => [...prevResources, res.data]);
      setShowCreateResource(false);
      setName("");
    } catch (error) {
      console.error("Error creating resource:", error);
    }
  };

  const handleCancelCreateResource = () => {
    setShowCreateResource(false);
  };

  const handleCreatePage = async (event: React.FormEvent, resourceId: number, spaceId: number) => {
    event.preventDefault();

    try {
      const res = await axios.post(`/api/dashboard/spaces/${spaceId}/resources/${resourceId}/pages/`, {
        title: pageTitle,
        notes: pageNotes,
        content: pageContent,
      });
      setSelectedResource((prevResource) => ({
        ...(prevResource || { id: resourceId, name: "", spaceId, pages: [] }),
        pages: [...(prevResource?.pages || []), res.data],
      }));
      setShowCreatePage(false);
      setPageTitle("");
      setPageContent("");
      setPageNotes("");
      setPageCreated(true); // Set pageCreated to true after creating a page
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  const handleCancelCreatePage = () => {
    setShowCreatePage(false);
  };

  return (
    <>
      <DashNav />
      <div className="flex">
        <div className="w-1/4 p-4 border-r">
          <Button onClick={() => setShowCreateResource(true)}>Create Resource</Button>
          <ul className="mt-4">
            {resources.map((resource) => (
              <li key={resource.id} className="flex justify-between items-center">
                <span
                  onClick={() => setSelectedResource(resource)}
                  className="cursor-pointer hover:text-blue-500"
                >
                  {resource.name}
                </span>
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedResource(resource);
                      setShowCreatePage(true);
                    }}
                  >
                    Create Page
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 p-4">
          {selectedResource && (
            <div>
              <h2>{selectedResource.name}</h2>
              <div>
                {selectedResource.pages && selectedResource.pages.length > 0 ? (
                  selectedResource.pages.map((page) => (
                    <div key={page.id} className="text-lg border dark:border-white border-black">
                      <div className="flex flex-col">
                      <h3>{page.title}</h3>
                      <p>{page.content}</p>
                      <p>{page.notes}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No pages available.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showCreateResource && (
        <Sheet open={showCreateResource} onOpenChange={setShowCreateResource}>
          <SheetContent>
            <form onSubmit={handleCreateResource}>
              <input
                type="text"
                placeholder="Resource Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Button type="submit">Create Resource</Button>
              <Button variant="ghost" onClick={handleCancelCreateResource}>
                Cancel
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      )}

      {showCreatePage && (
        <Sheet open={showCreatePage} onOpenChange={setShowCreatePage}>
          <SheetContent>
            <form onSubmit={(e) => handleCreatePage(e, (selectedResource?.id || 0), Number(params.id))}>
              <input
                type="text"
                placeholder="Title"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Content"
                value={pageContent}
                onChange={(e) => setPageContent(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Notes"
                value={pageNotes}
                onChange={(e) => setPageNotes(e.target.value)}
                required
              />
              <Button type="submit">Create Page</Button>
              <Button variant="ghost" onClick={handleCancelCreatePage}>
                Cancel
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
