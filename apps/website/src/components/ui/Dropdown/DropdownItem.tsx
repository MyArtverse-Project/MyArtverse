import Link from "next/link"
import { Menu } from "@headlessui/react"
import type { ReactMapElement } from "@/types"
import clsx from "clsx"

export default function DropdownItem({
  children,
  link,
  prefix,
  suffix,
  disabled,
  ...attributes
}: {
  children?: React.ReactNode
  link?: string
  disabled?: boolean
  prefix?: React.ReactElement
  suffix?: React.ReactElement
} & Pick<ReactMapElement<"button">, "onClick" | "onKeyDown" | "aria-label">) {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href={link as any}
          className={clsx(
            "w-full rounded-md transition-colors",
            active && "bg-400 text-700"
          )}
        >
          <span className="flex w-max select-none items-center justify-between gap-x-2 px-3 py-2 font-medium">
            {prefix}
            {children}
            {suffix}
          </span>
        </Link>
      )}
    </Menu.Item>
  )
}
