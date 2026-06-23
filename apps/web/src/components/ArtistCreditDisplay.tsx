import ArtistPlatformIcon from "@/components/ArtistPlatformIcon"
import Avatar from "@/components/Avatar"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { cn } from "@/lib/utils"
import type { ArtistPlatform } from "@mav/shared"
import Link from "next/link"

export type ArtistCreditDisplayValue = {
  label: string
  href: string
  isInternal: boolean
  platform?: ArtistPlatform | null
  avatarUrl?: string | null
}

const AVATAR_SIZES = {
  sm: 20,
  md: 28,
  lg: 44,
} as const

export default function ArtistCreditDisplay({
  credit,
  prefix = "",
  iconSize = "sm",
  className,
  linkClassName,
}: {
  credit: ArtistCreditDisplayValue
  prefix?: string
  iconSize?: "sm" | "md" | "lg"
  className?: string
  linkClassName?: string
}) {
  const avatarSize = AVATAR_SIZES[iconSize]

  const icon = credit.avatarUrl ? (
    <Avatar
      src={credit.avatarUrl || USER_DEFAULT_AVATAR}
      username={credit.label}
      size={avatarSize}
    />
  ) : (
    <ArtistPlatformIcon platform={credit.platform} size={iconSize} />
  )

  const content = (
    <>
      {icon}
      <span className="truncate">
        {prefix}
        {credit.label}
      </span>
    </>
  )

  const rowClass = cn("inline-flex min-w-0 items-center gap-2", className)
  const anchorClass = cn(
    "hover:text-foreground inline-flex min-w-0 items-center gap-2 transition-colors",
    linkClassName
  )

  if (credit.isInternal) {
    return (
      <Link href={credit.href} className={cn(rowClass, anchorClass)}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href={credit.href}
      target="_blank"
      rel="noreferrer"
      className={cn(rowClass, anchorClass)}
    >
      {content}
    </a>
  )
}
