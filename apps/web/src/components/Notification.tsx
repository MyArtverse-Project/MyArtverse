import { Artwork, Character } from "@/types/characters";
import { Comments } from "@/types/users";
import { USER_DEFAULT_AVATAR } from "@/utils/constants";
import { Button } from "@mav/ui/components/buttons";
import Image from "next/image";
import { LuCheck } from "react-icons/lu";


export default function Notification({ content, createdAt, read, senderAvatar, senderHandle, url, userAvatar, artwork, character, comment }: {
  content: string
  read: boolean
  userAvatar: string | null
  senderHandle?: string
  senderAvatar: string | null
  url: string | null
  comment?: Comments | null
  artwork?: Artwork | null
  character?: Character | null
  createdAt: Date
}) {
  const date = new Date(createdAt || "")
  const now = new Date()
  const diff = Math.floor(
    (now.getTime() - date.getTime()) / 1000 / 60 / 60 / 24
  )
  const diffString =
    diff > 0 ? `${diff} day${diff > 1 ? "s" : ""} ago` : "Earlier Today"

  // TODO: Read implementation


  return (
    <div className="flex flex-row justify-between items-center gap-x-5 w-full">
      <div className="flex flex-row items-center gap-x-6 py-3 w-full">
        <div className="relative w-[50px] h-[50px]">
          <Image
            src={userAvatar ?? USER_DEFAULT_AVATAR}
            alt="User Profile"
            width={60}
            height={60}
            className="absolute top-0 left-0 rounded-full"
          />
          <Image
            src={senderAvatar ?? USER_DEFAULT_AVATAR}
            alt="User Profile Overlay"
            width={30}
            height={30}
            className="absolute -bottom-1 -right-2 rounded-full border-2 border-white shadow-md"
          />
        </div>
        <div className="flex flex-col w-full gap-y-3">
          <span>{content.replace("%user%", senderHandle || "Someone")}</span>
          {comment && (
            <div className="bg-100 border-400 border rounded-md w-full px-3 py-2">{comment.content}</div>
          )}
          <span>{diffString}</span>
        </div>
      </div>
      <Button
        icon={
          <LuCheck size={20} />
        }
        variant="tritery"
      />
    </div>
  )
}
