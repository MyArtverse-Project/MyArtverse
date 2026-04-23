import { MenuItem } from "@headlessui/react"
import { cn } from "@mav/shared/utils"
import Link from "next/link"

export default function DropdownItem({
  children,
  link,
  prefixIcon,
  suffixIcon,
  component,
  special = false
  // ...attrs
}: {
  children?: React.ReactNode
  link?: string
  disabled?: boolean
  prefixIcon?: React.ReactElement
  suffixIcon?: React.ReactElement
  component?: React.ReactElement
  special?: boolean
} & Pick<
  React.HTMLProps<HTMLButtonElement>,
  "onClick" | "onKeyDown" | "aria-label"
>) {
  return (
    <MenuItem>
      {({ active }) => (
        <Link
          href={link ? link : "#"}
          className={cn(
            "w-full rounded-md transition-colors",
            active && "bg-400 text-700",
            special &&
              "w-full bg-gradient-to-b from-[#FFE5D2] to-[#DDB5FD] text-black"
          )}
        >
          <div
            className={cn(
              "flex w-max select-none items-center justify-between gap-x-2 px-3 font-medium",
              !component ? "py-2" : "w-full"
            )}
          >
            <span className="flex items-center gap-x-2">
              {prefixIcon}
              {children}
              {suffixIcon}
            </span>
            {/* TODO: Remove extra padding it adds to the button */}
            {component ? component : null}
          </div>
        </Link>
      )}
    </MenuItem>
  )
}
