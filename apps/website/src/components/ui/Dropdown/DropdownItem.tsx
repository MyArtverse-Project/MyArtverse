import { Menu } from "@headlessui/react"
import clsx from "clsx"
import Link from "next/link"

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
} & Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "onKeyDown" | "aria-label"
>) {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href={link as any}
          className={clsx(
            "rounded-md w-full transition-colors",
            active && "bg-400 text-700"
          )}
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
