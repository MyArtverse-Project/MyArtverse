import { MyArtverseIcon } from "@/components/icons/MyArtverse"
import { cn } from "@/lib/utils"
import type { ArtistPlatform } from "@mav/shared"
import { LuGlobe } from "react-icons/lu"
import { FaXTwitter } from "react-icons/fa6"
import { SiBluesky, SiTelegram } from "react-icons/si"

const SIZE_CLASSES = {
  sm: "size-5 rounded-md [&_svg]:size-3",
  md: "size-7 rounded-lg [&_svg]:size-3.5",
  lg: "size-11 rounded-xl [&_svg]:size-5",
} as const

const LOGO_SCALE = {
  sm: 0.28,
  md: 0.34,
  lg: 0.42,
} as const

export default function ArtistPlatformIcon({
  platform,
  size = "sm",
  className,
}: {
  platform: ArtistPlatform | null | undefined
  size?: keyof typeof SIZE_CLASSES
  className?: string
}) {
  const boxClass = cn(
    "inline-flex shrink-0 items-center justify-center",
    SIZE_CLASSES[size],
    className
  )

  if (platform === "mav") {
    return (
      <span
        className={cn(
          boxClass,
          "bg-gradient-to-br from-[#FFE5D2] via-[#F5D0FE] to-[#DDB5FD] text-violet-950 shadow-sm"
        )}
        aria-hidden
      >
        <MyArtverseIcon logoOnly size={LOGO_SCALE[size]} />
      </span>
    )
  }

  if (platform === "bluesky") {
    return (
      <span
        className={cn(boxClass, "bg-[#0085FF]/12 text-[#0085FF]")}
        aria-hidden
      >
        <SiBluesky className="size-[1.1em]" />
      </span>
    )
  }

  if (platform === "x") {
    return (
      <span
        className={cn(boxClass, "bg-foreground/8 text-foreground")}
        aria-hidden
      >
        <FaXTwitter className="size-[1.1em]" />
      </span>
    )
  }

  if (platform === "telegram") {
    return (
      <span
        className={cn(boxClass, "bg-[#26A5E4]/12 text-[#26A5E4]")}
        aria-hidden
      >
        <SiTelegram className="size-[1.1em]" />
      </span>
    )
  }

  return (
    <span
      className={cn(boxClass, "bg-muted text-muted-foreground")}
      aria-hidden
    >
      <LuGlobe className="size-[1.1em]" />
    </span>
  )
}
