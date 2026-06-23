"use client"

import type { Comments, UserType } from "@/types/users"
import { postComment } from "@/utils/api"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserCommentInput from "@/components/comments/UserCommentInput"
import CommentThread from "./Thread"
import Avatar from "@/components/Avatar"
import { LuFilter } from "react-icons/lu"
import { useMemo, useState } from "react"
import { PanelCard, PanelEmptyState } from "../PanelCard"

type SortMode = "newest" | "oldest"

export default function CommentPanel({
  comments,
  self,
  type,
  characterName,
}: {
  comments: Comments[]
  self: UserType | null
  type: "user" | "character"
  characterName?: string
}) {
  const [sort, setSort] = useState<SortMode>("newest")

  const sortedComments = useMemo(() => {
    const list = [...comments]
    list.sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime()
      const bTime = new Date(b.createdAt).getTime()
      return sort === "newest" ? bTime - aTime : aTime - bTime
    })
    return list
  }, [comments, sort])

  return (
    <PanelCard
      title="Profile comments"
      actions={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <LuFilter className="size-4" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSort("newest")}>
              Newest first
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort("oldest")}>
              Oldest first
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    >
      {self ? (
        <div className="bg-background/80 rounded-xl border border-primary/15 p-3">
          <UserCommentInput
            postComment={postComment}
            imgTag={
              <Avatar
                src={self.avatarUrl ? self.avatarUrl : USER_DEFAULT_AVATAR}
              />
            }
            avatar={self.avatarUrl ? self.avatarUrl : USER_DEFAULT_AVATAR}
            commentType={type}
            redirectRoute={`/@${self.handle}${characterName ? `/${characterName}` : ""}`}
            username={self.handle}
            characterName={characterName}
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        {sortedComments.length > 0 ? (
          sortedComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-background rounded-xl border border-primary/20 p-4 shadow-sm"
            >
              <CommentThread comment={comment} user={self} />
            </div>
          ))
        ) : (
          <PanelEmptyState ownerHint="Be the first to leave a comment.">
            No comments yet.
          </PanelEmptyState>
        )}
      </div>
    </PanelCard>
  )
}
