import * as React from "react"

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CreateSpace() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create space</CardTitle>
        <CardDescription>Create a new space  in one-click</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your space" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="course">Course</Label>
              <Select>
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
                  <SelectItem value="dsa">Data Sturctures and Algorithm</SelectItem>
                  <SelectItem value="upsc">UPSC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Begin</Button>
      </CardFooter>
    </Card>
  )
}
