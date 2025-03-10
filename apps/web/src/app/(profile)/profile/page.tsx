"use client"

import Image from "next/image"
import { ProfileMasthead } from "@/components/layouts/Mastheads"
import { Button } from "@mav/ui/components/buttons"
import { UserComment, UserCommentInput } from "@mav/ui/components/comments"
import { Group } from "@mav/ui/components/layouts"
import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  if (!user && !isLoading) router.push("/login")
  

  return (
    <>
      <ProfileMasthead />
      <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-4 px-8 py-6">
        {/* <div className="col-span-2">main editable content</div> */}
        <div className="flex flex-col gap-y-3">
          <Group title="Dynamic content"></Group>
        </div>
        <aside className="flex flex-col gap-y-3">
          <Group title="About user"></Group>
          <Group title="Comments" potentialActions={<Button>Filter</Button>}>
            <div className="mb-5">
              <UserCommentInput
                imgTag={Image}
                avatar="/img/examples/kuro/kuro-example4.png"
              />
            </div>
            <div className="grid gap-y-4">
              <UserComment
                imgTag={Image}
                avatar="/img/examples/kuro/kuro-example4.png"
                handle="kurojifusky"
                isPinned
                isOP
              >
                Comment test
              </UserComment>
              <UserComment
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
