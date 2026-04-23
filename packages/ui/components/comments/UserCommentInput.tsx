import { type ComponentProps, useRef, useState } from "react"
import { Button } from "../buttons"
import { CommentBase } from "./CommentBase"

interface CommentInputProps extends ComponentProps<typeof CommentBase> {
  disabled?: boolean
  commentType: string
  redirectRoute: string
  artworkId?: string
  username?: string
  characterName?: string
  targetId?: string
  toggleReply?: () => void
  postComment?: (
    commentType: string,
    content: string,
    redirectRoute: string,
    artworkId?: string | null,
    username?: string,
    characterName?: string | null,
    targetId?: string | null
  ) => void
}

export function UserCommentInput(props: CommentInputProps) {
  const [commentText, setCommentText] = useState("")
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleInputChange = () => {
    setCommentText(textAreaRef.current?.value.trim() || "")
  }

  const post = async () => {
    if (!props.postComment || !commentText) return

    props.postComment(
      props.commentType,
      commentText,
      props.redirectRoute,
      props.artworkId ?? null,
      props.username,
      props.characterName ?? null,
      props.parentId ?? null
    )

    if (textAreaRef.current) {
      textAreaRef.current.value = ""
    }

    setCommentText("")
  }

  return (
    <CommentBase
      avatar={props.avatar}
      imgTag={props.imgTag}
      outerContainer={
        <div className="mt-1 flex justify-end gap-x-2">
          {props.toggleReply && (
            <Button size="small" variant="tritery" onClick={props.toggleReply}>
              Cancel
            </Button>
          )}
          <Button size="small" onClick={post} disabled={!commentText}>
            Post
          </Button>
        </div>
      }
    >
      <div className="overflow-hidden rounded-md font-normal">
        <textarea
          ref={textAreaRef}
          id={props.toggleReply ? "reply" : "comment"}
          className="text-700 h-fit w-full resize-none bg-transparent p-3 focus:outline-none focus:ring-0"
          placeholder="Add a comment..."
          onChange={handleInputChange}
          rows={1}
        />
      </div>
    </CommentBase>
  )
}
