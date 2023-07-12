'use client';

import { useState, useEffect, createContext, type ReactElement } from "react"

import type { ChildrenNode } from "@/types"

interface MenuDropdownProps extends Required<ChildrenNode> {
  buttonChild: ReactElement<HTMLButtonElement>
}

export const MenuDropdownContext = createContext<{
  dropdownToggle: boolean
  setDropdownToggle: (isDropdownActive: boolean) => void
}>({
  dropdownToggle: true,
  setDropdownToggle: () => {}
})

export default function MenuDropdown(props: MenuDropdownProps) {
  const { buttonChild, children } = props

  const [dropdownToggle, setDropdownToggle] = useState(false)

  useEffect(() => {
    const handleDropdown = (e: MouseEvent) => {
      if (dropdownToggle) return

      const pointedTarget = (e.target as HTMLDivElement).offsetParent

      if (!pointedTarget || pointedTarget === document.body) {
        setDropdownToggle(!dropdownToggle)
      }
    }

    const handleEscapeDropdown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownToggle(!dropdownToggle)
      }
    }

    window.addEventListener("click", handleDropdown)
    window.addEventListener("keydown", handleEscapeDropdown)

    return () => {
      window.removeEventListener("click", handleDropdown)
      window.removeEventListener("keydown", handleEscapeDropdown)
    }
  }, [dropdownToggle, setDropdownToggle])

  return (
    <div
      id="menu-dropdown-container"
      className="relative grid place-items-center"
    >
      <MenuDropdownContext.Provider
        value={{ dropdownToggle, setDropdownToggle }}
      >
        {buttonChild}
        <div
          id="menu-contents"
          role="menu"
          className="absolute p-2 transition-opacity border border-red-100 rounded-md shadow-md -right-2 top-12"
          style={
            dropdownToggle
              ? { opacity: 0, pointerEvents: "none" }
              : { opacity: 1 }
          }
        >
          {!dropdownToggle ? children : undefined}
        </div>
      </MenuDropdownContext.Provider>
    </div>
  )
}
