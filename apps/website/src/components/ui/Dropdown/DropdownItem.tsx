/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"
import { Menu } from "@headlessui/react"
import cn from "@/utils/cn"
import type { ReactMapElement } from "@/types/utils"

export default function DropdownItem({
  children,
  link,
  prefixIcon,
  suffixIcon,
  ...attrs
}: {
  children?: React.ReactNode
  link?: string
  disabled?: boolean
  prefixIcon?: React.ReactElement
  suffixIcon?: React.ReactElement
} & Pick<ReactMapElement<"button">, "onClick" | "onKeyDown" | "aria-label">) {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href={link as any}
          className={cn(
            "w-full rounded-md transition-colors",
            active && "bg-400 text-700"
          )}
        >
          <span className="flex w-max select-none items-center justify-between gap-x-2 px-3 py-2 font-medium">
            {prefixIcon}
            {children}
            {suffixIcon}
          </span>
        </Link>
      )}
    </Menu.Item>
  )
}
