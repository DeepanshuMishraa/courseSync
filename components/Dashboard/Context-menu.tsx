'use client';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DialogContent, DialogDescription } from "@radix-ui/react-dialog";

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

export default function ContextMenuDemo({
  resource,
  resources,
  setResources,
  selectedResource,
  setSelectedResource,
  params,
  setSelectedPage,
}: {
  resource: Resource;
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
  selectedResource: Resource | null;
  setSelectedResource: React.Dispatch<React.SetStateAction<Resource | null>>;
  params: { id: string };
  setSelectedPage: React.Dispatch<React.SetStateAction<Page | null>>;
}) {
  const [showCreatePage, setShowCreatePage] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [pageContent, setPageContent] = useState("");
  const [pageNotes, setPageNotes] = useState("");

  const handleCreatePage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedResource) return;

    try {
      const res = await axios.post(`/api/dashboard/spaces/${params.id}/resources/${selectedResource.id}/pages/`, {
        title: pageTitle,
        notes: pageNotes,
        content: pageContent,
      });

      const newPage = res.data;
      setSelectedResource({
        ...selectedResource,
        pages: [...selectedResource.pages, newPage],
      });

      setResources((prevResources) =>
        prevResources.map((r) =>
          r.id === selectedResource.id ? { ...r, pages: [...r.pages, newPage] } : r
        )
      );

      setShowCreatePage(false);
      setPageTitle("");
      setPageContent("");
      setPageNotes("");
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  const handleDeleteResource = async () => {
    try {
      await axios.delete(`/api/dashboard/spaces/${params.id}/resources?resourceId=${resource.id}`);
      setResources((prevResources) => prevResources.filter((res) => res.id !== resource.id));
      setSelectedResource(null);
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  const handleDeletePage = async (pageId: number) => {
    try {
      await axios.delete(`/api/dashboard/spaces/${params.id}/resources/${resource.id}/pages?pageId=${pageId}`);

      setSelectedResource((prevResource) => {
        if (!prevResource) return null;
        const updatedPages = prevResource.pages.filter((page) => page.id !== pageId);
        return { ...prevResource, pages: updatedPages };
      });

      setResources((prevResources) =>
        prevResources.map((r) =>
          r.id === resource.id ? { ...r, pages: r.pages.filter((page) => page.id !== pageId) } : r
        )
      );

      setSelectedPage(null);
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger className="cursor-pointer">
          <span
            onClick={() => setSelectedResource(resource)}
            className="hover:text-blue-500"
          >
            {resource.name}
          </span>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem onSelect={() => setShowCreatePage(true)}>Create Page</ContextMenuItem>
          <ContextMenuItem onSelect={handleDeleteResource}>Delete {resource.name}</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <Dialog open={showCreatePage} onOpenChange={setShowCreatePage}>
        <DialogTrigger asChild>
        </DialogTrigger>
        <DialogContent className=" p-4 sm:max-w-[425px] bg-gray-800 z-10 rounded-lg shadow-lg ">
          <DialogHeader>
            <DialogTitle>Create Page</DialogTitle>
            <DialogDescription>
            Create a new page for the resource <strong>{resource.name}</strong>.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreatePage}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter title here"
                    value={pageTitle}
                    className="col-span-2 h-8"
                    onChange={(e) => setPageTitle(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter notes here"
                    value={pageNotes}
                    className="col-span-2 h-8"
                    onChange={(e) => setPageNotes(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter content here"
                    value={pageContent}
                    className="col-span-2 h-8"
                    onChange={(e) => setPageContent(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
          <DialogFooter>
          <Button type="submit" onClick={handleCreatePage}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedResource?.id === resource.id && resource.pages && (
        <ul className="mt-2 pl-4">
          {resource.pages.map((page) => (
            <li key={page.id}>
              <ContextMenu>
                <ContextMenuTrigger className="cursor-pointer">
                  <span
                    onClick={() => setSelectedPage(page)}
                    className="hover:text-blue-500"
                  >
                    {page.title}
                  </span>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuItem onSelect={() => handleDeletePage(page.id)}>Delete Page</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
