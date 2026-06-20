"use client"

import { useState } from "react"
import { AiFillPushpin } from "react-icons/ai"
import { LuMoreVertical } from "react-icons/lu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import CommentBase from "./CommentBase"
import UserCommentInput from "./UserCommentInput"

interface CommentProps extends React.ComponentProps<typeof CommentBase> {
  handle: string
  isOP?: boolean
  userRole?: string
  isPinned?: true
  upvotes?: string
  parentId?: string
  replies?: number
  toggleViewReplies?: () => void
  viewReplies?: boolean
  date?: string
  commentContext?: {
    commentType: string
    redirectRoute: string
    artworkId?: string
  }
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
  const toggleReplyInput = () => setShowReplyInput(!showReplyInput)

  const date = new Date(props.date || "")
  const now = new Date()
  const diff = Math.floor(
    (now.getTime() - date.getTime()) / 1000 / 60 / 60 / 24
  )
  const diffString =
    diff > 0 ? `${diff} day${diff > 1 ? "s" : ""} ago` : "Earlier Today"

  return (
    <CommentBase
      avatar={props.avatar}
      imgTag={props.imgTag}
      parentId={props.parentId}
      outerContainer={
        <div className="mt-0.5 flex flex-col items-start gap-y-1">
          <Button size="sm" variant="ghost" onClick={toggleReplyInput}>
            Reply
          </Button>
          {(props.replies || 0) > 0 && props.toggleViewReplies && (
            <Button size="sm" onClick={props.toggleViewReplies}>
              View {props.replies} Replies
            </Button>
          )}
          <div className="w-full">
            {showReplyInput && (
              <UserCommentInput
                imgTag={<img />}
                avatar={props.avatar}
                parentId={props.commentId}
                commentType={props.commentContext?.commentType ?? "user"}
                redirectRoute={
                  props.commentContext?.redirectRoute ?? `/@${props.handle}`
                }
                artworkId={props.commentContext?.artworkId}
                username={props.handle}
                toggleReply={toggleReplyInput}
                postComment={props.onReply}
              />
            )}
          </div>
        </div>
      }
    >
      <div className="relative flex flex-col gap-y-0.5">
        <div className="px-3 py-2.5">
          <div className="flex h-6 items-center gap-x-1.5">
            <div className="font-semibold">{`@${props.handle}`}</div>
            {props.isOP && <Badge variant="secondary">OG</Badge>}
            {props.isPinned && (
              <div className="text-primary inline-flex items-center gap-x-1.5">
                <AiFillPushpin />
                <span>Pinned</span>
              </div>
            )}
            <span className="text-muted-foreground text-xs">{diffString}</span>
          </div>
          <Button
            size="icon"
            variant="ghost"
            aria-label="More options"
            className="absolute right-2 top-2 size-7 rounded-full"
          >
            <LuMoreVertical size={14} />
          </Button>
          <div className="mt-1 font-normal">{props.children}</div>
        </div>
      </div>
    </CommentBase>
  )
}
