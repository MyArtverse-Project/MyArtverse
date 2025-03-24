import Image from "next/image"
import React from "react"
import { useValidateChildrenComponents } from "../../hooks"

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CommentBaseProps {
  imgTag: React.ReactNode
  avatar: string
  outerContainer?: React.ReactNode
}

/** @internal This is a shared component */
export function CommentBase(props: React.PropsWithChildren<CommentBaseProps>) {
  const validImgTags = useValidateChildrenComponents(props.children, [
    "img",
    "Image"
  ])

  return (
    <div
      data-mav-comment-node=""
      className="flex items-start gap-x-4 rounded-md"
    >
      {validImgTags && (
        <span className="flex-shrink-0">
          {React.cloneElement(props.imgTag as React.ReactElement<any>, {
            src: props.avatar,
            alt: "Avatar",
            className: "h-10 w-10 rounded-full"
          })}
        </span>
      )}
      <div className="relative flex-1">
        <span
          className="bg-100 border-400 absolute -left-1.5 top-[1.05rem] z-10 block size-3 rotate-45 border border-r-0 border-t-0"
          aria-hidden
        />
        <div
          className="border-400 min-h-12 rounded-md border"
          data-mav-comment-node-base-slot=""
        >
          {props.children}
        </div>
        {props.outerContainer}
      </div>
    </div>
  )
}
