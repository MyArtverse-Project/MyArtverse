"use client"

import type { UserRoles } from "@/types/users"
import Author from "../Author"
import { Avatar } from "../Buttons"

/** This is an internal wrapper for namespaced `<Comment />` components, don't use it anywhere else! */
export default function CommentWrapper({
  children,
  avatar,
  noAuthor,
  roles
}: Readonly<
  Partial<
    {
      children: React.ReactNode
      avatar: string
      username: string
      noAuthor: boolean
    } & React.ComponentProps<typeof Author>
  >
>) {
  return (
    <div className="flex items-start gap-x-4">
      <div className="flex-shrink-0">
        <Avatar size={40} src={avatar ?? "/img/examples/kuro/kuro-example4.png"} />
      </div>
      <div className="flex w-full flex-col gap-y-1">
        {!noAuthor ? <Author username="MrBeast" roles={roles} /> : null}
        {children}
      </div>
    </div>
  )
}
