"use client"

import Avatar from "@/components/Avatar"
import UserCommentInput from "@/components/comments/UserCommentInput"
import CommentThread from "@/components/layouts/Panels/Comments/Thread"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { User } from "@/app/context/AuthContext"
import type { Comments } from "@/types/users"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { postComment } from "@/utils/api"
import { LuChevronDown, LuFilter } from "react-icons/lu"
import { useMemo, useState } from "react"

type SortMode = "newest" | "oldest"

export default function ArtworkComments({
  artworkId,
  comments: initialComments,
  self,
  redirectPath,
}: {
  artworkId: string
  comments: Comments[]
  self: User | null
  redirectPath: string
}) {
  const [sort, setSort] = useState<SortMode>("newest")

  const commentContext = {
    commentType: "art",
    redirectRoute: redirectPath,
    artworkId,
  }

  const sortedComments = useMemo(() => {
    const list = [...initialComments]
    list.sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime()
      const bTime = new Date(b.createdAt).getTime()
      return sort === "newest" ? bTime - aTime : aTime - bTime
    })
    return list
  }, [initialComments, sort])

  return (
    <section className="mt-10 border-t border-primary/10 pt-8">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xl font-semibold tracking-tight">Comments</h2>
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary h-6 min-w-6 rounded-full border-0 px-2 text-xs font-semibold"
          >
            {initialComments.length}
          </Badge>
        </div>
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
      </div>

      {self ? (
        <div className="mb-6">
          <UserCommentInput
            postComment={postComment}
            imgTag={
              <Avatar
                src={self.avatarUrl || USER_DEFAULT_AVATAR}
                username={self.handle}
                size={44}
              />
            }
            avatar={self.avatarUrl || USER_DEFAULT_AVATAR}
            commentType="art"
            redirectRoute={redirectPath}
            artworkId={artworkId}
            username={self.handle}
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
              commentContext={commentContext}
            />
          ))
        ) : (
          <p className="text-muted-foreground py-4 text-center text-sm">
            No comments yet. Be the first to share your thoughts.
          </p>
        )}
      </div>
    </section>
  )
}
