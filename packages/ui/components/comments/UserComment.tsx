"use client"

import { AiFillPushpin } from "react-icons/ai"
import { LuMoreVertical, LuThumbsUp } from "react-icons/lu"
import { Badge } from "../badges"
import { Button } from "../buttons"
import { CommentBase } from "./CommentBase"
import { useState } from "react"
import { UserCommentInput } from "./UserCommentInput"

interface CommentProps extends React.ComponentProps<typeof CommentBase> {
  handle: string
  isOP?: boolean
  userRole?: string
  isPinned?: true
  upvotes?: string
  reply?: CommentProps[]
  parentId?: string
  replies?: CommentProps[]
  date?: string
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

export function UserComment(props: React.PropsWithChildren<CommentProps>) {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyText, setReplyText] = useState("")
  const toggleReplyInput = () => setShowReplyInput(!showReplyInput)

  const date = new Date(props.date || "")
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60 / 60 / 24)
  const diffString = diff > 0 ? `${diff} day${diff > 1 ? "s" : ""} ago` : "Earlier Today"

  return (
    <CommentBase
      avatar={props.avatar}
      imgTag={props.imgTag}
      parentId={props.parentId}
      outerContainer={
        <div className="mt-0.5 flex flex-col items-start gap-y-1">
          <Button size="small" className="transition-none" variant="tritery" onClick={toggleReplyInput}>
            Reply
          </Button>
          {props.reply && props.reply?.length > 0 && (
            <Button size="small" className="transition-none" variant="primary">
              View {props.reply?.length} Replies
            </Button>
          )}
          <div className="w-full">
            {showReplyInput && (
              <UserCommentInput
                imgTag={<img />}
                avatar={props.avatar}
                parentId={props.commentId}
                commentType="user"
                redirectRoute={`/@${props.handle}`}
                username={props.handle}
                toggleReply={toggleReplyInput}
                postComment={props.onReply}
              />
            )}
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-y-0.5">
        {/* bubble chat viz wrapper */}
        <div className="px-3 py-2.5 empty:*:hidden">
          {/* details */}
          <div className="flex h-6 items-center gap-x-1.5">
            <div className="font-semibold">{`@${props.handle}`}</div>
            {props.isOP && <Badge size="small">OG</Badge>}
            {props.isPinned && (
              <div className="text-500 inline-flex items-center gap-x-1.5 opacity-100">
                <AiFillPushpin />
                <span>Pinned</span>
              </div>
            )}
            <span className="text-xs opacity-75">{diffString}</span>
          </div>
          <Button
            size="small"
            className="absolute right-2 top-2 rounded-full p-0 transition-none"
            variant="tritery"
            icon={<LuMoreVertical size={14} />}
          />
          {/* Comment contents */}
          <div data-mav-comment-contents="" className="mt-1 font-normal">
            {props.children}
          </div>
          <div data-mav-comment-embed=""></div>
        </div>
      </div>
    </CommentBase>
  )
}
