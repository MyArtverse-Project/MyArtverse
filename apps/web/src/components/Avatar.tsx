"use client"

import { isRemoteImageUrl, USER_DEFAULT_AVATAR } from "@/utils/constants"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Avatar({
  className,
  username,
  src,
  size = 36
}: {
  className?: string
  username?: string
  src?: string
  size?: number
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
      className={className ?? "overflow-hidden rounded-full"}
    >
      <Image
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
