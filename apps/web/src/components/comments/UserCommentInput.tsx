"use client"

import Avatar from "@/components/Avatar"
import { type ComponentProps, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import CommentBase from "./CommentBase"

interface CommentInputProps extends Omit<ComponentProps<typeof CommentBase>, "variant"> {
  disabled?: boolean
  parentId?: string
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

export default function UserCommentInput(props: CommentInputProps) {
  const [commentText, setCommentText] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const isExpanded = isFocused || commentText.length > 0 || Boolean(props.toggleReply)

  const handleInputChange = () => {
    const value = textAreaRef.current?.value ?? ""
    setCommentText(value)

    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"
      textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 160)}px`
    }
  }

  const post = async () => {
    const trimmed = commentText.trim()
    if (!props.postComment || !trimmed) return

    props.postComment(
      props.commentType,
      trimmed,
      props.redirectRoute,
      props.artworkId ?? null,
      props.username,
      props.characterName ?? null,
      props.parentId ?? null
    )

    if (textAreaRef.current) {
      textAreaRef.current.value = ""
      textAreaRef.current.style.height = "auto"
    }

    setCommentText("")
    setIsFocused(false)
    props.toggleReply?.()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      void post()
    }

    if (event.key === "Escape" && props.toggleReply) {
      props.toggleReply()
    }
  }

  return (
    <CommentBase
      variant="composer"
      composerExpanded={isExpanded}
      alignAvatar={isExpanded ? "start" : "center"}
      avatar={props.avatar}
      imgTag={
        props.imgTag ?? (
          <Avatar src={props.avatar} username={props.username} size={44} />
        )
      }
      isNested={props.isNested}
    >
      <div className="font-normal">
        {props.username && isExpanded ? (
          <p className="text-muted-foreground px-4 pt-3 text-xs">
            Commenting as{" "}
            <span className="text-foreground font-medium">@{props.username}</span>
          </p>
        ) : null}

        <textarea
          ref={textAreaRef}
          id={props.toggleReply ? "reply" : "comment"}
          disabled={props.disabled}
          className={cn(
            "text-foreground placeholder:text-muted-foreground w-full resize-none border-0 bg-transparent text-sm leading-relaxed shadow-none focus:outline-none focus:ring-0",
            isExpanded ? "min-h-[4.5rem] px-4 py-3" : "min-h-[2.5rem] px-4 py-2"
          )}
          placeholder={
            props.toggleReply
              ? "Write a reply..."
              : isExpanded && props.username
                ? `Add a comment as @${props.username}...`
                : "Add a comment..."
          }
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (!commentText.trim()) setIsFocused(false)
          }}
          onKeyDown={handleKeyDown}
          rows={1}
        />

        {isExpanded ? (
          <div className="flex items-center justify-between gap-3 px-3 pb-3 pt-1">
            <p className="text-muted-foreground hidden text-xs sm:block">
              Enter to post, Shift+Enter for a new line
            </p>
            <div className="ml-auto flex items-center gap-2">
              {props.toggleReply ? (
                <Button size="sm" variant="ghost" onClick={props.toggleReply}>
                  Cancel
                </Button>
              ) : null}
              <Button size="sm" onClick={post} disabled={!commentText.trim()}>
                Post
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </CommentBase>
  )
}
