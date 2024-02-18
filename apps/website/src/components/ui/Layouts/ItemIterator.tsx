"use client"

import { usePathname } from "next/navigation"
import clsx from "clsx"
import { kebabCase } from "lodash"
import { Button } from "../Buttons"

export default function ItemIterator({
  as: Component = "div",
  items,
  baseUrl = "/"
}: {
  as?: keyof HTMLElementTagNameMap | React.ComponentType
  items: { icon: any; text: string }[]
  baseUrl?: string
}) {
  const path = usePathname()

  return (
    <Component>
      {items.map((item, index) => {
        const isMatchingRoute = path === `${baseUrl}${kebabCase(item.text)}`

        return (
          <Button
            key={index}
            variant="tritery"
            prefixIcon={<item.icon size={21} className="flex-shrink-0" />}
            href={`${baseUrl}${kebabCase(item.text)}`}
            aria-current={isMatchingRoute ? "page" : null}
            className={clsx(
              "flex items-center gap-x-1.5 rounded-md border-[2px] border-transparent px-4 py-2",
              isMatchingRoute
                ? "bg-500 text-active"
                : "hover:bg-300 transition-[border,background-color]"
            )}
          >
            <span className="ml-0.5">{item.text}</span>
          </Button>
        )
      })}
    </Component>
  )
}
