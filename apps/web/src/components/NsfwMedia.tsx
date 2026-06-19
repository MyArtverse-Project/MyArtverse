"use client"

import { useNsfwPreferences } from "@/app/context/NsfwPreferencesContext"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { LuLock } from "react-icons/lu"

type NsfwMediaProps = {
  src: string
  alt: string
  nsfw?: boolean
  className?: string
  containerClassName?: string
  width?: number
  height?: number
  fill?: boolean
  unoptimized?: boolean
  compact?: boolean
}

export default function NsfwMedia({
  src,
  alt,
  nsfw = false,
  className,
  containerClassName,
  width,
  height,
  fill = false,
  unoptimized = true,
  compact = false,
}: NsfwMediaProps) {
  const { preferences, isReady } = useNsfwPreferences()
  const [revealed, setRevealed] = useState(false)

  if (!nsfw || !isReady) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        unoptimized={unoptimized}
        className={className}
      />
    )
  }

  if (!preferences.showNsfw) {
    if (compact) {
      return (
        <div
          className={cn(
            "bg-muted text-muted-foreground flex h-full w-full items-center justify-center",
            containerClassName
          )}
          title="NSFW content"
        >
          <LuLock size={12} />
        </div>
      )
    }

    return (
      <div
        className={cn(
          "bg-muted/50 text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center",
          containerClassName
        )}
      >
        <LuLock size={20} className="shrink-0" />
        <p className="text-sm font-medium">NSFW content</p>
        <Link
          href="/settings/appearance"
          className="text-primary text-xs underline-offset-4 hover:underline"
        >
          Enable in settings
        </Link>
      </div>
    )
  }

  if (preferences.nsfwDisplayMode === "blur" && !revealed) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setRevealed(true)
        }}
        className={cn(
          "relative block h-full w-full overflow-hidden",
          containerClassName
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          unoptimized={unoptimized}
          className={cn("scale-105 blur-xl", className)}
        />
        <span className="bg-background/60 absolute inset-0 flex items-center justify-center text-xs font-medium backdrop-blur-sm">
          Click to reveal
        </span>
      </button>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      unoptimized={unoptimized}
      className={className}
    />
  )
}
