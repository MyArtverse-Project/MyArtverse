"use client"

import cn from "@/utils/cn"
import type { MapElement } from "@/types/utils"

export default function MastheadLayer({
  children,
  spaceBetween
}: {
  children: React.ReactNode
  spaceBetween?: boolean
} & Partial<Pick<MapElement<"div">, "className">>) {
  return (
    <div
      className={cn("flex flex-wrap items-center", spaceBetween ? "justify-between" : "")}
    >
      {children}
    </div>
  )
}
