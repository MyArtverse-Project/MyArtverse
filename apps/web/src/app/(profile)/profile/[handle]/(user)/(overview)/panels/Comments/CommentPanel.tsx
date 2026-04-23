"use client"
import { type User } from "@/app/context/AuthContext"
import type { Comments, UserType } from "@/types/users"
import { postComment } from "@/utils/api"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { Button } from "@headlessui/react"
import { UserCommentInput } from "@mav/ui/components/comments"
import { Group } from "@mav/ui/components/layouts"
import CommentThread from "./Thread"

export default function CommentPanel({
  comments,
  user,
  self
}: {
  comments: Comments[]
  user: UserType
  self?: User | null
}) {
  return (
    <Group title="Comments" potentialActions={<Button>Filter</Button>}>
      {self && (
        <div className="my-5">
          <UserCommentInput
            postComment={postComment}
            imgTag={<img />}
            avatar={user?.avatarUrl || USER_DEFAULT_AVATAR}
            commentType="user"
            redirectRoute={`/@${user.handle}`}
            username={user.handle}
          />
        </div>
      )}

      <div className="grid gap-y-4">
        {comments.map((comment) => (
          <CommentThread key={comment.id} comment={comment} user={user} />
        ))}
      </div>
    </Group>
  )
}
