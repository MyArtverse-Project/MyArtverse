"use client"

import { useContext } from "react"

import Button from "../Buttons/Button"
import type { ChildrenNode, Variants } from "@/types"
import { MenuDropdownContext } from "./MenuDropdown"

interface MenuDropdownButtonProps extends ChildrenNode {
  variant?: Variants
  ["aria-label"]?: string
}

export default function MenuDropdownButton(props: MenuDropdownButtonProps) {
  const { children, variant, "aria-label": ariaLabel } = props
  const { dropdownToggle, setDropdownToggle } = useContext(MenuDropdownContext)

  return (
    <Button
      variant={variant ?? "primary"}
      aria-label={ariaLabel}
      onClick={() => setDropdownToggle(!dropdownToggle)}
      className="p-0"
    >
      {children}
    </Button>
  )
}
