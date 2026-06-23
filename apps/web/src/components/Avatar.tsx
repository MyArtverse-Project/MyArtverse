"use client"

import { isRemoteImageUrl, USER_DEFAULT_AVATAR } from "@/utils/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Avatar({
  className,
  username,
  src,
  size = 36,
  imageKey,
}: {
  className?: string
  username?: string
  src?: string
  size?: number
  imageKey?: string
}) {
  const resolvedSrc = src || USER_DEFAULT_AVATAR
  const [imgSrc, setImgSrc] = useState(resolvedSrc)

  useEffect(() => {
    setImgSrc(resolvedSrc)
  }, [resolvedSrc])

  return (
    <div
      data-avatar=""
      aria-label={username}
      style={{ height: `${size}px`, width: `${size}px` }}
      className={cn("overflow-hidden rounded-full", className)}
    >
      <Image
        key={imageKey ? `${imageKey}:${imgSrc}` : imgSrc}
        src={imgSrc}
        className="aspect-square object-cover"
        alt={username ? `Avatar of ${username}` : ""}
        decoding="async"
        loading="eager"
        priority
        fetchPriority="high"
        width={size}
        height={size}
        draggable={false}
        unoptimized={isRemoteImageUrl(imgSrc)}
        onError={() => {
          if (imgSrc !== USER_DEFAULT_AVATAR) {
            setImgSrc(USER_DEFAULT_AVATAR)
          }
        }}
      />
    </div>
  )
}
