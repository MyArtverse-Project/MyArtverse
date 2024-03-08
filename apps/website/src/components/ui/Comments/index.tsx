import dynamic from "next/dynamic"
import CommentSkeleton from "./CommentSkeleton"

const CommentField = dynamic(
  () => import("./CommentField")
)

const CommentItem = dynamic(
  () => import("./CommentItem"),
  { loading: CommentSkeleton, ssr: false }
)

function Comment({
  children
}: Readonly<{ children?: React.ReactNode }>) {
  return (
    <div
      id="comments-renderer"
      className="flex flex-col gap-y-3.5"
    >
      {children}
    </div>
  )
}

export default Object.assign(Comment, {
  Field: CommentField,
  Item: CommentItem
})
