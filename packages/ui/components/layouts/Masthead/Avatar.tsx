import Image from "next/image"
import { cn } from "@mav/shared/utils"

export function MastheadAvatar({
  src,
  profileOnly,
  banner = false
}: {
  src?: string
  /** This property is strictly for profile layouts only! */
  profileOnly?: boolean
  /** This property is strictly for profile layouts only! */
  banner?: boolean
}) {
  return (
    <div
      className={cn(
        "relative size-32 flex-shrink-0  lg:size-44",
        !profileOnly ? "" : banner ? "-mt-12" : "mt-12"
      )}
    >
      <div
        className={cn(
          "border-100 bg-100 absolute aspect-square size-32 overflow-hidden border-4 lg:size-44",
          !profileOnly ? "rounded-xl" : "rounded-full"
        )}
      >
        <Image
          src={src ? src : "/UserProfile.png"}
          alt={`Avatar of Username`}
          objectFit="cover"
          width={1500}
          height={1500}
        />
      </div>
    </div>
  )
}
