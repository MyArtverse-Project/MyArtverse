import { cn } from "@/lib/utils"
import React from "react"

interface CommentBaseProps {
  imgTag: React.ReactNode
  parentId?: string
  commentId?: string
  avatar: string
  outerContainer?: React.ReactNode
}

/** @internal Shared comment layout primitive */
export default function CommentBase(
  props: React.PropsWithChildren<CommentBaseProps>
) {
  return (
    <div
      className={cn(
        "flex items-start gap-x-4 rounded-md",
        props.parentId && "ml-14 mt-2"
      )}
    >
      <span className="flex-shrink-0">
        {React.cloneElement(props.imgTag as React.ReactElement<any>, {
          src: props.avatar,
          alt: "Avatar",
          className: "h-10 w-10 rounded-full object-cover"
        })}
      </span>
      <div className="relative flex-1">
        <span
          className="bg-card border-border absolute -left-1.5 top-[1.05rem] z-10 block size-3 rotate-45 border border-r-0 border-t-0"
          aria-hidden
        />
        <div className="border-border bg-card min-h-12 rounded-md border">
          {props.children}
        </div>
        {props.outerContainer}
      </div>
    </div>
  )
}
