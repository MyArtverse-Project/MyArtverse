"use client"

import Image from "next/image"
import { Button } from "@headlessui/react"
import React from "react"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { UserComment, UserCommentInput } from "@mav/ui/components/comments"
import { Group } from "@mav/ui/components/layouts"
import { Comments, UserType } from "@/types/users"

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
        />
      </div>
      <div className="grid gap-y-4">
        <UserComment
          imgTag={<img />}
          avatar="/img/examples/kuro/kuro-example4.png"
          handle="kurojifusky"
          isPinned
          isOP
        >
          Comment test
        </UserComment>
        <UserComment
          imgTag={<img />}
          avatar="/img/examples/ozzy/5.png"
          handle="ediwow"
        >
          Gamer moment
        </UserComment>
      </div>
    </Group>
  )
}
