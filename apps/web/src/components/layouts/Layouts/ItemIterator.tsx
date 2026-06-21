"use client"

import type { LinkedString } from "@/types/utils"
import { cn } from "@mav/shared/utils"
import { Button } from "@/components/ui/button"
import { kebabCase } from "lodash"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { IconType } from "react-icons"

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
            asChild
            variant="ghost"
            aria-label={text}
            className={cn(
              "flex items-center justify-start gap-x-1.5 rounded-md border-[2px] border-transparent px-4 py-2",
              (isRouteActive || (matchStartingRoute && isRouteMatches)) &&
                "bg-accent text-accent-foreground"
            )}
          >
            <Link href={parsedUrl}>
              <Icon size={20} className="flex-shrink-0" aria-hidden />
              <span className="ml-0.5" aria-hidden>
                {text}
              </span>
            </Link>
          </Button>
        )
      })}
    </Component>
  )
}
