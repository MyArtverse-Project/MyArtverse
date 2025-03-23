"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import { ProfileMasthead } from "@/components/layouts/Mastheads"
import { Button } from "@mav/ui/components/buttons"
import { UserComment, UserCommentInput } from "@mav/ui/components/comments"
import { Group } from "@mav/ui/components/layouts"

// TODO: Using `@ts-expect-error` here is a temporary workaround until we can

export default function ProfilePage() {
  return (
    <>

      <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-4 px-8 py-6">
        <div className="col-span-2">main editable content</div>
        <div className="flex flex-col gap-y-3">
          <Group title="Dynamic content"></Group>
        </div>
        <aside className="flex flex-col gap-y-3">
          <Group title="About user"></Group>
          <Group title="Comments" potentialActions={<Button>Filter</Button>}>
            <div className="mb-5">
              <UserCommentInput
                // @ts-expect-error
                imgTag={Image}
                avatar="/img/examples/kuro/kuro-example4.png"
              />
            </div>
            <div className="grid gap-y-4">
              <UserComment
                // @ts-expect-error
                imgTag={Image}
                avatar="/img/examples/kuro/kuro-example4.png"
                handle="kurojifusky"
                isPinned
                isOP
              >
                Comment test
              </UserComment>
              <UserComment
                // @ts-expect-error
                imgTag={Image}
                avatar="/img/examples/ozzy/5.png"
                handle="ediwow"
              >
                Gamer moment
              </UserComment>
            </div>
          </Group>
        </aside>
      </div>
    </>
  )
}
