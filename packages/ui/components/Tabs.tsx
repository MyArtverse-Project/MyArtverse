"use client"

import { cn } from "@mav/shared/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { IconType } from "react-icons"
import { Badge } from "./badges"

interface TabItem {
  text: string
  link: string
  active: boolean
  icon: IconType
  countIndicator: number
  isNew: boolean
}

interface TabProps {
  baseURL?: string
  items: Partial<TabItem>[]
}

export function Tabs(props: TabProps) {
  const { baseURL = "/", items: tabItems } = props

  const pathname = usePathname()

  return (
    <div data-mav-tabs="" className="flex items-center gap-x-1 py-1">
      {tabItems.map(({ text, link, icon: Icon, countIndicator }, index) => {
        const hasPathMatches = pathname === `${baseURL}${link}`

        return (
          <Link
            key={index}
            prefetch
            href={`${baseURL}${link}` as any}
            className={cn(
              "group relative flex items-center gap-x-2 rounded-md px-4 py-2 transition-colors before:absolute before:-bottom-[0.2rem] before:left-0 before:right-0 before:block before:h-0.5",
              hasPathMatches
                ? "text-500 hover:bg-200 before:bg-500"
                : "hover:bg-300"
            )}
            aria-current={hasPathMatches ? "page" : undefined}
            aria-label={
              !countIndicator ? text : `${text}, ${countIndicator} items`
            }
          >
            {Icon && <Icon size={20} aria-hidden />}
            <span className="contents">{text}</span>
            {countIndicator?.toString() && (
              <Badge size="small">{countIndicator}</Badge>
            )}
          </Link>
        )
      })}
    </div>
  )
}
