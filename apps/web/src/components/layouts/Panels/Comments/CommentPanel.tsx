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
import { LuChevronDown, LuFilter } from "react-icons/lu"
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

  const redirectRoute = `/@${self?.handle ?? "user"}${characterName ? `/${characterName}` : ""}`

  return (
    <PanelCard
      title="Comments"
      actions={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-muted-foreground gap-1.5">
              <LuFilter className="size-3.5" />
              Sort
              <LuChevronDown className="size-3.5 opacity-60" />
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
        <div className="mb-5">
          <UserCommentInput
            postComment={postComment}
            imgTag={
              <Avatar
                src={self.avatarUrl ? self.avatarUrl : USER_DEFAULT_AVATAR}
                username={self.handle}
                size={44}
              />
            }
            avatar={self.avatarUrl ? self.avatarUrl : USER_DEFAULT_AVATAR}
            commentType={type}
            redirectRoute={redirectRoute}
            username={self.handle}
            characterName={characterName}
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-5">
        {sortedComments.length > 0 ? (
          sortedComments.map((comment) => (
            <CommentThread
              key={comment.id}
              comment={comment}
              user={self}
              commentContext={{
                commentType: type,
                redirectRoute,
              }}
            />
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
