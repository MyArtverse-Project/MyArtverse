"use client"

import { usePathname } from "next/navigation"
import cn from "@/utils/cn"
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
      {items.map(({ icon: Icon, text, link, matchStartingRoute }, index) => {
        const parsedUrl = `${baseUrl}${link ? link.slice(1) : kebabCase(text)}`

        const isRouteMatches = path.startsWith(parsedUrl)
        const isRouteActive = path === parsedUrl

        return (
          <Button
            key={index}
            variant="tritery"
            prefixIcon={<Icon size={20} className="flex-shrink-0" aria-hidden />}
            href={parsedUrl}
            aria-label={text}
            className={cn(
              "flex items-center gap-x-1.5 rounded-md border-[2px] border-transparent px-4 py-2",
              isRouteActive || (matchStartingRoute && isRouteMatches)
                ? "bg-500 text-active"
                : "hover:bg-300 transition-[border,background-color]"
            )}
          >
            <span className="ml-0.5" aria-hidden>
              {text}
            </span>
          </Button>
        )
      })}
    </Component>
  )
}
