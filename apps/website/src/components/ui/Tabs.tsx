"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import type { IconType } from "react-icons"
import type { PartialArray } from "@/types/utils"

export default function Tabs({
  baseURL = "/",
  items
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
    <div className="flex items-center gap-x-1 py-2">
      {items.map(({ text, link, icon: Icon, countIndicator }, i) => (
        <Link
          key={i}
          prefetch
          href={`${baseURL}${link}` as any}
          className={clsx(
            "group relative flex items-center gap-x-2 rounded-md px-4 py-2 transition-colors before:absolute before:-bottom-2 before:left-0 before:right-0 before:block before:h-0.5",
            pathname === `${baseURL}${link}`
              ? "text-500 hover:bg-200 before:bg-500"
              : "hover:bg-300"
          )}
          aria-label={!countIndicator ? text : `${text}, ${countIndicator} items`}
        >
          {Icon && <Icon size={20} aria-hidden />}
          <span>{text}</span>
          {countIndicator && (
            <span
              aria-hidden
              className="bg-300 rounded-2xl px-2 py-0.5 text-xs group-hover:bg-opacity-100"
            >
              {countIndicator}
            </span>
          )}
        </Link>
      ))}
    </div>
  )
}
