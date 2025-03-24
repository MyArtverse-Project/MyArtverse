import type { ComponentProps } from "react"
import { Button } from "../buttons"
import { CommentBase } from "./CommentBase"

interface CommentInputProps extends ComponentProps<typeof CommentBase> {
  disabled?: true | string
  commentType: string
  artworkId?: string | undefined
  username?: string | undefined
  characterName: string | undefined,
  postComment?: (
    commentType: string,
    artworkId: string | undefined,
    username: string | undefined,
    characterName: string | undefined,
    content: string
  ) => void
}

export function UserCommentInput(props: CommentInputProps) {
  const post = async () => {
    if (!props.postComment) return
    props.postComment(
      props.commentType,
      props.artworkId,
      props.username,
      props.characterName,
      (
        document.querySelector(
          "[data-mav-comment-input]"
        ) as HTMLTextAreaElement
      )?.value
    )
  }

  return (
    <CommentBase
      avatar={props.avatar}
      imgTag={props.imgTag}
      outerContainer={
        <div className="mt-1 flex justify-end gap-x-2">
          <Button size="small" variant="tritery">
            Cancel
          </Button>
          <Button size="small" onClick={post}>
            Post
          </Button>
        </div>
      }
    >
      <div className="overflow-hidden rounded-md font-normal">
        <textarea
          data-mav-comment-input=""
          className="text-700 h-fit w-full resize-none bg-transparent p-3  focus:outline-none focus:ring-0"
          placeholder="Add a comment..."
          rows={1}
        />
      </div>
    </CommentBase>
  )
}
