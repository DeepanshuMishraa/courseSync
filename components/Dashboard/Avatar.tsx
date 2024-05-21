import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "../ui/avatar"
  
  export function Avatar1() {
    return (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@coursesync" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    )
  }
  