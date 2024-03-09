"use client"

import { usePathname } from "next/navigation"
import clsx from "clsx"
import { kebabCase } from "lodash"
import type { IconType } from "react-icons"
import type { LinkedString } from "@/types/utils"
import { Button } from "../Buttons"

export interface ItemIteratorType {
  icon: IconType
  text: string
  link?: LinkedString
  matchStartingRoute?: boolean
}

export default function ItemIterator({
  as: Component = "div",
  items,
  baseUrl = "/"
}: {
  as?: keyof HTMLElementTagNameMap | React.ComponentType
  items: ItemIteratorType[]
  baseUrl?: string
}) {
  const path = usePathname()

  return (
    <Component>
      {items.map((item, index) => {
        const parsedUrl = `${baseUrl}${kebabCase(item.text)}`
        const isMatchingRoute = path.startsWith(parsedUrl)
        const isActiveRoute = path === parsedUrl

        return (
          <Button
            key={index}
            variant="tritery"
            prefixIcon={<item.icon size={20} className="flex-shrink-0" aria-hidden />}
            href={parsedUrl}
            aria-current={isMatchingRoute ? "page" : null}
            aria-label={item.text}
            className={clsx(
              "flex items-center gap-x-1.5 rounded-md border-[2px] border-transparent px-4 py-2",
              isActiveRoute || (item.matchStartingRoute && isMatchingRoute)
                ? "bg-500 text-active"
                : "hover:bg-300 transition-[border,background-color]"
            )}
          >
            <span className="ml-0.5" aria-hidden>
              {item.text}
            </span>
          </Button>
        )
      })}
    </Component>
  )
}
