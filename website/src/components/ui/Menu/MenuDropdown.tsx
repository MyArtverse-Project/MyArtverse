import { useState, useEffect, type ReactElement } from "react"

import type { ChildrenNode } from "@/types"

interface MenuDropdownProps extends Required<ChildrenNode> {
  buttonChild: ReactElement<HTMLButtonElement>
  state?: boolean
}

export default function MenuDropdown({
  buttonChild,
  children,
  state
}: MenuDropdownProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {}, [])

  return (
    <div menu-dropdown-container="" className="relative grid place-items-center">
      {buttonChild}
      <div
        menu-contents=""
        role="menu"
        className="absolute p-2 transition-opacity border border-red-100 rounded-md shadow-md -right-2 top-12"
        style={!state ? { opacity: 0, pointerEvents: "none" } : { opacity: 1 }}
      >
        {children}
      </div>
    </div>
  )
}
