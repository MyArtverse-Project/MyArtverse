import type { IncludeReactNode } from "@/types"
import { Menu } from "@headlessui/react"
import Link from "next/link"

export default function DropdownItem({
  children,
  link,
  prefix,
  suffix,
  disabled
}: IncludeReactNode<{
  link?: string
  disabled?: boolean
  prefix?: React.ReactElement
  suffix?: React.ReactElement
}>) {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href="/"
          className={`rounded-md w-full transition-colors ${
            active && "bg-red-200"
          }`}
        >
          <span className="flex items-center justify-between px-3 py-2 font-medium select-none w-max gap-x-2">
            {prefix}
            {children}
            {suffix}
          </span>
        </Link>
      )}
    </Menu.Item>
  )
}
