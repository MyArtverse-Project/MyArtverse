"use client"

import Image from "next/image"
import { Button } from "@headlessui/react"
import { UserComment, UserCommentInput } from "@mav/ui/components/comments"
import { Group } from "@mav/ui/components/layouts"

export default function CommentPanel() {
  return (
    <Group title="Comments" potentialActions={<Button>Filter</Button>}>
      <div className="my-5">
        <UserCommentInput
          imgTag={<img  />}
          avatar="/img/examples/kuro/kuro-example4.png"
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
