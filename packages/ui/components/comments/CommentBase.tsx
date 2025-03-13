/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ForwardRefExoticComponent,
  PropsWithChildren,
  ReactNode,
} from "react"

interface CommentBaseProps {
  // TODO: Attempt to fix the type of imgTag
  imgTag?: any
  avatar: string
  outerContainer?: ReactNode
}

/** @internal This is a shared component */
export function CommentBase(props: PropsWithChildren<CommentBaseProps>) {
  const ImageTag = props.imgTag ?? ("img" as const)

  return (
    <div
      data-mav-comment-node=""
      className="flex items-start gap-x-4 rounded-md"
    >
      <ImageTag
        src={props.avatar}
        alt=""
        width="40"
        height="40"
        className="aspect-square flex-shrink-0 rounded-full object-cover"
      />
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
