"use client"

import Image from "next/image"
import { Button } from "@headlessui/react"
import React from "react"
import { postComment } from "@/utils/api"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { UserComment, UserCommentInput } from "@mav/ui/components/comments"
import { Group } from "@mav/ui/components/layouts"
import type { Comments, UserType } from "@/types/users"
import CommentThread from "./Thread"
import { type User } from "@/app/context/AuthContext"


export default function CommentPanel({
  comments,
  user,
  self
}: {
  comments: Comments[]
  user: UserType,
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
