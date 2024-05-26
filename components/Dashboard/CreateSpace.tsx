"use client"
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastDestructive } from "../ToastDestructive";
import toast, { Toaster } from "react-hot-toast";

interface CreateSpaceProps {
  onAddSpace: (space: any) => void;
  onCancel?: () => void;
}

export function CreateSpace({ onAddSpace, onCancel }: CreateSpaceProps) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [course, setCourse] = React.useState("");
  const [error, setError] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setError(false);
      setLoading(true);
      const response = await axios.post("/api/dashboard/spaces", {
        name,
        description,
        course,
      });
      const newSpace = response.data;
      onAddSpace(newSpace);
      toast.success("Space created successfully");
      router.push("/dashboard");
    } catch (e) {
      console.log(e);
      setError(true);
      toast.error("Error creating space");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create space</CardTitle>
          <CardDescription>Create a new space in one-click</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="Name of your space"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this space about?"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="course">Course</Label>
                <Select onValueChange={setCourse}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="btech">BTech.</SelectItem>
                    <SelectItem value="highschool">High School</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="higheredu">Higher Education</SelectItem>
                    <SelectItem value="webdev">Web Development</SelectItem>
                    <SelectItem value="devops">Devops</SelectItem>
                    <SelectItem value="dsa">Data Structures and Algorithm</SelectItem>
                    <SelectItem value="upsc">UPSC</SelectItem>
                    <SelectItem value="Web3">Web3</SelectItem>
                    <SelectItem value="Programming Languages">Programming Languages</SelectItem>
                    <SelectItem value="sys design">System Design</SelectItem>
                    <SelectItem value="Interview prep">Interview Preparation</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="ML|AI">ML & AI</SelectItem>
                    <SelectItem value="govt">Government Exams</SelectItem>
                    <SelectItem value="Job">Remote Job</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>
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
              "Begin"
            )}
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </>
  );
}
