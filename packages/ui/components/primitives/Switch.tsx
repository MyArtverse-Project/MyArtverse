"use client"

import { Switch as HeadlessSwitch } from "@headlessui/react"
import { cn } from "@mav/shared/utils"

interface SwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  "aria-label"?: string
}

export function Switch({
  checked,
  onChange,
  disabled,
  className,
  ...props
}: SwitchProps) {
  return (
    <HeadlessSwitch
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      data-mav-switch=""
      className={cn(
        "bg-400 group relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors",
        "data-[checked]:bg-500 focus-visible:ring-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-100",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="bg-active pointer-events-none ml-0.5 inline-block h-5 w-5 translate-x-0 rounded-full shadow transition-transform duration-200 group-data-[checked]:translate-x-5"
      />
    </HeadlessSwitch>
  )
}
