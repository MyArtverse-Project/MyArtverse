"use client"

import { ReactElement, useContext } from "react"

import Button from "../Buttons/Button"
import type { ChildrenNode, Variants } from "@/types"
import { DropdownContext } from "./Dropdown"

interface DropdownButtonProps extends ChildrenNode {
  iconOnly?: boolean
  variant?: Variants
  ["aria-label"]?: string
  suffixIcon?: ReactElement
  className?: string
}

export default function DropdownButton(props: DropdownButtonProps) {
  const {
    children,
    variant,
    iconOnly,
    "aria-label": ariaLabel,
    suffixIcon,
    className
  } = props
  const { dropdownToggle, setDropdownToggle } = useContext(DropdownContext)

  return (
    <Button
      iconOnly={iconOnly}
      variant={variant ?? "primary"}
      aria-label={ariaLabel}
      onClick={() => setDropdownToggle(!dropdownToggle)}
      className={className ?? undefined}
      suffixIcon={suffixIcon}
    >
      {children}
    </Button>
  )
}
