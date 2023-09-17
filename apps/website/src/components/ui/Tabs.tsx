"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import clsx from "clsx"
import type { LucideIcon } from "lucide-react"
import type { PartialArray } from "@/types"

export default function Tabs({
  items
}: {
  items: PartialArray<{
    text: string
    link: string
    active: boolean
    icon: LucideIcon
    countIndicator: number
  }>
}) {
  const pathname = usePathname()

  return (
    <div id="biro-ui-tab-row" className="flex items-center gap-x-1 py-2">
      {items.map(({ text, link, icon: Icon, countIndicator }, i) => (
        <Link
          key={i}
          prefetch
          id="tab-link"
          href={link as any}
          className={clsx(
            "flex items-center px-4 py-2 transition-colors rounded-md gap-x-2 group relative before:absolute before:left-0 before:right-0 before:-bottom-2 before:block before:h-0.5",
            pathname === link
              ? "text-500 hover:bg-200 before:bg-500"
              : "hover:bg-200"
          )}
          aria-label={
            !countIndicator ? text : `${text}, ${countIndicator} items`
          }
        >
          {Icon && <Icon size={20} aria-hidden />}
          <span>{text}</span>
          {countIndicator && (
            <span
              aria-hidden
              className="text-xs px-2 py-0.5 group-hover:bg-opacity-100 bg-300 rounded-2xl"
            >
              {countIndicator}
            </span>
          )}
        </Link>
      ))}
    </div>
  )
}
