"use client"

import { ReactElement, useContext } from "react"

import Button from "../Buttons/Button"
import type { ChildrenNode, Variants } from "@/types"
import { MenuDropdownContext } from "./MenuDropdown"

interface MenuDropdownButtonProps extends ChildrenNode {
  iconOnly?: boolean
  variant?: Variants
  ["aria-label"]?: string
  suffixIcon?: ReactElement
  className?: string
}

export default function MenuDropdownButton(props: MenuDropdownButtonProps) {
  const {
    children,
    variant,
    iconOnly,
    "aria-label": ariaLabel,
    suffixIcon,
    className
  } = props
  const { dropdownToggle, setDropdownToggle } = useContext(MenuDropdownContext)

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
