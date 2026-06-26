"use client"

import Avatar from "@/components/Avatar"
import { useState } from "react"
import { LuMoreVertical } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import CommentAuthorHeader from "./CommentAuthorHeader"
import CommentBase from "./CommentBase"
import CommentContent from "./CommentContent"
import UserCommentInput from "./UserCommentInput"
import type { UserType } from "@/types/users"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"

interface CommentProps extends React.ComponentProps<typeof CommentBase> {
  handle: string
  commentId?: string
  author?: Pick<UserType, "id" | "role" | "hasArtistAccess">
  isPinned?: true
  parentId?: string
  isNested?: boolean
  date?: string
  commentContext?: {
    commentType: string
    redirectRoute: string
    artworkId?: string
  }
  currentUser?: Pick<UserType, "handle" | "avatarUrl"> | null
  onReply: (
    commentType: string,
    content: string,
    redirectRoute: string,
    artworkId?: string | null,
    username?: string,
    characterName?: string | null,
    replyId?: string | null
  ) => void
}

export default function UserComment(
  props: React.PropsWithChildren<CommentProps>
) {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const toggleReplyInput = () => setShowReplyInput((current) => !current)

  const replyAvatar = props.currentUser?.avatarUrl || USER_DEFAULT_AVATAR
  const replyHandle = props.currentUser?.handle

  return (
    <CommentBase
      avatar={props.avatar}
      imgTag={props.imgTag}
      isNested={props.isNested}
      variant="message"
      outerContainer={
        <div className="mt-1.5 flex flex-col items-start gap-2 pl-1">
          {props.currentUser ? (
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground h-7 px-2 text-xs"
              onClick={toggleReplyInput}
            >
              Reply
            </Button>
          ) : null}
          {showReplyInput && props.currentUser && replyHandle ? (
            <div className="w-full">
              <UserCommentInput
                imgTag={
                  <Avatar
                    src={replyAvatar}
                    username={replyHandle}
                    size={44}
                  />
                }
                avatar={replyAvatar}
                parentId={props.commentId}
                isNested={props.isNested}
                commentType={props.commentContext?.commentType ?? "user"}
                redirectRoute={
                  props.commentContext?.redirectRoute ?? `/@${props.handle}`
                }
                artworkId={props.commentContext?.artworkId}
                username={replyHandle}
                toggleReply={toggleReplyInput}
                postComment={props.onReply}
              />
            </div>
          ) : null}
        </div>
      }
    >
      <div className="relative px-4 py-3">
        <Button
          size="icon"
          variant="ghost"
          aria-label="More options"
          className="text-muted-foreground hover:text-foreground absolute right-1 top-1 size-7 rounded-full"
        >
          <LuMoreVertical size={14} />
        </Button>

        <CommentAuthorHeader
          handle={props.handle}
          author={props.author}
          isPinned={props.isPinned}
          date={props.date}
        />

        <div className="mt-2">
          {typeof props.children === "string" ? (
            <CommentContent content={props.children} />
          ) : (
            props.children
          )}
        </div>
      </div>
    </CommentBase>
  )
}
