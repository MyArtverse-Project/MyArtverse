import { UserType } from "@/types/users"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { cn } from "@mav/shared/utils"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Modal from "../layouts/Modal"

export default function RelationModal({
  followers,
  following,
  displayRelationsModal,
  toggleRelationsModal,
  startingTab
}: {
  followers: UserType[]
  following: UserType[]
  displayRelationsModal: boolean
  toggleRelationsModal: (type?: string) => void
  startingTab: string
}) {
  const [tab, setTab] = useState(startingTab)
  return (
    <Modal
      state={displayRelationsModal}
      toggler={toggleRelationsModal}
      className="w-full md:w-[600px] h-full md:h-[500px] p-5"
    >
      <Modal.Body>
        <div className="flex flex-row gap-x-4 ">
          <span
            className={cn(
              tab == "follower" && "border border-b-2  border-primary text-primary",
              " text-lg cursor-pointer"
            )}
            onClick={() => setTab("follower")}
          >
            Followers
          </span>
          <span
            className={cn(
              tab == "following" && "border border-b-2 border-primary text-primary",
              "text-lg cursor-pointer"
            )}
            onClick={() => setTab("following")}
          >
            Following
          </span>
        </div>
        <div className="flex flex-col gap-y-2 mt-5">
          {tab == "follower" && (
            <div className="flex flex-col gap-y-2">
              {followers.map((follower) => (
                <Link
                  key={follower.id}
                  href={`/@${follower.handle}`}
                  className="hover:bg-muted/40 flex flex-row items-center gap-x-2 rounded-md p-1"
                >
                  <Image
                    src={follower.avatarUrl || USER_DEFAULT_AVATAR}
                    alt={follower.handle}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span>{follower.displayName || follower.handle}</span>
                </Link>
              ))}
            </div>
          )}
          {tab == "following" && (
            <div className="flex flex-col gap-y-2">
              {following.map((followee) => (
                <Link
                  key={followee.id}
                  href={`/@${followee.handle}`}
                  className="hover:bg-muted/40 flex flex-row items-center gap-x-2 rounded-md p-1"
                >
                  <Image
                    src={followee.avatarUrl || USER_DEFAULT_AVATAR}
                    alt={followee.handle}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span>{followee.displayName || followee.handle}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  )
}
