"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"
import { usePathname } from "next/navigation"
import cn from "@/utils/cn"
import type { IconType } from "react-icons"
import type { PartialArray } from "@/types/utils"

export default function Tabs({
  baseURL = "/",
  items: tabItems
}: {
  baseURL?: string
  items: PartialArray<{
    text: string
    link: string
    active: boolean
    icon: IconType
    countIndicator: number
    isNew: boolean
  }>
}) {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-x-1 py-1">
      {tabItems.map(({ text, link, icon: Icon, countIndicator }, index) => {
        const pathMatches = pathname === `${baseURL}${link}`

        return (
          <Link
            key={index}
            prefetch
            href={`${baseURL}${link}` as any}
            className={cn(
              "group relative flex items-center gap-x-2 rounded-md px-4 py-2 transition-colors before:absolute before:-bottom-[0.2rem] before:left-0 before:right-0 before:block before:h-0.5",
              pathMatches ? "text-500 hover:bg-200 before:bg-500" : "hover:bg-300"
            )}
            aria-current={pathMatches ? "page" : undefined}
            aria-label={!countIndicator ? text : `${text}, ${countIndicator} items`}
          >
            {Icon && <Icon size={20} aria-hidden />}
            <span>{text}</span>
            {countIndicator ? (
              <span
                aria-hidden
                className="bg-300 rounded-2xl px-2 py-0.5 text-xs group-hover:bg-opacity-100"
              >
                {countIndicator}
              </span>
            ) : null}
          </Link>
        )
      })}
    </div>
  )
}
