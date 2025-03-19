/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"
import { Menu, MenuItem } from "@headlessui/react"
import { cn } from "@mav/shared/utils"

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
} & Pick<React.HTMLProps<HTMLButtonElement>, "onClick" | "onKeyDown" | "aria-label">) {

  return (
    <MenuItem>
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
    </MenuItem>
  )
}
