"use client"
import { type User } from "@/app/context/AuthContext"
import type { Comments, UserType } from "@/types/users"
import { postComment } from "@/utils/api"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { Button } from "@headlessui/react"
import { UserCommentInput } from "@mav/ui/components/comments"
import { Group } from "@mav/ui/components/layouts"
import CommentThread from "./Thread"
import Avatar from "@/components/Avatar"

export default function CommentPanel({
  comments,
  self,
  type,
  characterName
}: {
  comments: Comments[]
  self: User | null
  type: "user" | "character"
  characterName?: string
}) {
  return (
    <Group title="Comments" potentialActions={<Button>Filter</Button>}>
      {self && (
        <div className="my-5">
          <UserCommentInput
            postComment={postComment}
            imgTag={<Avatar src={self?.avatarUrl ? self.avatarUrl : USER_DEFAULT_AVATAR} />}
            avatar={self?.avatarUrl ? self.avatarUrl : USER_DEFAULT_AVATAR}
            commentType={type}
            redirectRoute={`/@${self?.handle}${characterName ? `/${characterName}` : ""}`}
            username={self?.handle}
            characterName={characterName}
          />
        </div>
      )}

      <div className="grid gap-y-4">
        {comments.map((comment, index) => (
          <CommentThread key={comment.id} comment={comment} user={self} />
        ))}
      </div>
    </Group>
  )
}
