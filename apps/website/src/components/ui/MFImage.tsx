"use client"

import Image from "next/image"
import { useState } from "react"
import type { ReactMapElement } from "@/types"
import clsx from "clsx"

type ImgLoadStrategy = "lazy" | "neutral" | "important"

export default function MFImage({
  src,
  alt,
  aspectRatio,
  height,
  width,
  sizes,
  strategy = "neutral",
  objectFit,
  rounded,
  style,
  ...attributes
}: {
  src: string
  aspectRatio?: string
  height?: string | number
  width?: string | number
  sizes?: string
  strategy?: ImgLoadStrategy
  objectFit?: React.CSSProperties["objectFit"]
  rounded?: number
} & Pick<ReactMapElement<"img">, "alt" | "onClick" | "onContextMenu" | "style">) {
  const [imgLoaded, setImgLoaded] = useState(false)

  const loadingStrategy: Record<
    ImgLoadStrategy,
    Pick<ReactMapElement<"img">, "fetchPriority"> & {
      priority: boolean
    }
  > = {
    lazy: {
      fetchPriority: "low",
      priority: false
    },
    neutral: {
      fetchPriority: "auto",
      priority: true
    },
    important: {
      fetchPriority: "high",
      priority: true
    }
  }

  const setStrategy = loadingStrategy[strategy]

  return (
    <div
      className="relative before:absolute before:inset-0 before:z-[2]"
      style={{
        aspectRatio,
        height,
        width,
        overflow: "hidden",
        borderRadius: rounded
      }}
      draggable="false"
      {...attributes}
    >
      <Image
        style={{
          userSelect: "none",
          objectFit,
          ...style
        }}
        fill
        src={src}
        alt={alt ?? ""}
        decoding="async"
        sizes={sizes}
        fetchPriority={setStrategy.fetchPriority}
        priority={setStrategy.priority}
        onLoad={() => setImgLoaded(true)}
      />
      <div
        id="loading-skeleton"
        className={clsx(
          "absolute inset-0 -z-[2] animate-pulse bg-red-500",
          !imgLoaded ? "" : "hidden"
        )}
      />
    </div>
  )
}
