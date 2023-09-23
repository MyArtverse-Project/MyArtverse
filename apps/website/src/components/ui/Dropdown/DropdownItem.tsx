import { Menu } from "@headlessui/react"
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
          className={`rounded-md w-full transition-colors ${
            active && "bg-color-2"
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
