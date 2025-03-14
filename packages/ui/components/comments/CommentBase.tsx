/* eslint-disable @typescript-eslint/no-explicit-any */
interface CommentBaseProps {
  imgTag: React.ReactNode
  avatar: string
  outerContainer?: React.ReactNode
}

/** @internal This is a shared component */
export function CommentBase(props: React.PropsWithChildren<CommentBaseProps>) {
  return (
    <div
      data-mav-comment-node=""
      className="flex items-start gap-x-4 rounded-md"
    >
      {props.imgTag}
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
