"use client"

import Image from "next/image"
import { Button } from "@headlessui/react"
import React from "react"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { UserComment, UserCommentInput } from "@mav/ui/components/comments"
import { Group } from "@mav/ui/components/layouts"
import { Comments, UserType } from "@/types/users"
import { postComment } from "@/utils/api"

export default function CommentPanel({
  comments,
  user
}: {
  comments: Comments[]
  user: UserType
}) {
  return (
    <Group title="Comments" potentialActions={<Button>Filter</Button>}>
      <div className="my-5">
        <UserCommentInput
          imgTag={<img />}
          avatar={user?.avatarUrl || USER_DEFAULT_AVATAR}
          postComment={postComment}
          commentType="user"
          
          username={user.handle}
          
        />
      </div>
      <div className="grid gap-y-4">

      {comments.map((comment, index) => (
        <UserComment
          key={index}
          imgTag={<img />}
          avatar={comment.author.avatarUrl || USER_DEFAULT_AVATAR}
          handle={comment.author.handle}
          // isPinned={comment.isPinned} // TODO: Will implement on backend first
          isOP={comment.author.id == user.id}
        >
          {comment.content}
        </UserComment>
      ))}
      </div>
    </Group>
  )
}
