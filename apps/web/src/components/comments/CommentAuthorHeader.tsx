import type { UserType } from "@/types/users"
import { AiFillPushpin } from "react-icons/ai"
import CommentAuthorBadges from "./CommentAuthorBadges"
import { formatRelativeTime } from "@/utils/formatRelativeTime"

export default function CommentAuthorHeader({
  handle,
  author,
  isPinned,
  date,
}: {
  handle: string
  author?: Pick<UserType, "role" | "hasArtistAccess">
  isPinned?: boolean
  date?: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pr-8">
      <span className="text-foreground text-sm font-semibold">@{handle}</span>
      {author ? <CommentAuthorBadges author={author} /> : null}
      {isPinned ? (
        <span className="text-primary inline-flex items-center gap-1 text-xs font-medium">
          <AiFillPushpin size={12} />
          Pinned
        </span>
      ) : null}
      <span className="text-muted-foreground text-xs">
        {formatRelativeTime(date ?? new Date())}
      </span>
    </div>
  )
}
