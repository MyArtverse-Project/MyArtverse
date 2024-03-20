import Link from "next/link"
import { LuShield } from "react-icons/lu"
import type { UserRoles } from "@/types/users"

export default function Author({
  username,
  handle,
  roles,
  commentTime,
  commentorOP
}: {
  username?: string
  handle?: string
  roles: UserRoles
  commentTime?: string
  commentorOP?: true
}) {
  // TODO fetch images and other metadata for `username`
  return (
    <div id="author-inline" className="flex items-center gap-x-2">
      <span className="inline-flex items-center gap-x-1">
        <Link href={`/@${handle}` as unknown} className="font-semibold">
          {username ?? handle}
        </Link>
        {/* role badges */}
        <LuShield size={17} />
      </span>
      {commentTime ? (
        <span className="text-600 text-xs opacity-75">{commentTime}</span>
      ) : null}
    </div>
  )
}
