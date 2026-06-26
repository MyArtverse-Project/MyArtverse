import type { UserType } from "@/types/users"
import { LuPaintbrush, LuShieldCheck } from "react-icons/lu"

export default function CommentAuthorBadges({
  author,
}: {
  author: Pick<UserType, "role" | "hasArtistAccess">
}) {
  const isStaff =
    author.role === "admin" ||
    author.role === "moderator" ||
    author.role === "developer"

  return (
    <span className="inline-flex items-center gap-1">
      {author.hasArtistAccess ? (
        <LuPaintbrush
          size={14}
          className="text-primary/80 shrink-0"
          aria-label="Artist"
        />
      ) : null}
      {isStaff ? (
        <LuShieldCheck
          size={14}
          className="text-primary/80 shrink-0"
          aria-label="Staff"
        />
      ) : null}
    </span>
  )
}
