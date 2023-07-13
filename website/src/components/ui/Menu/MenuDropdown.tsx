"use client"

import {
  type ReactElement,
  useState,
  useEffect,
  createContext,
  useRef
} from "react"
import dynamic from "next/dynamic"

import type { ChildrenNode } from "@/types"

const Portal = dynamic(() => import("../Portal"), { ssr: false })

interface MenuDropdownProps extends Required<ChildrenNode> {
  buttonChild: ReactElement<HTMLButtonElement>
  state?: boolean
}

export const MenuDropdownContext = createContext<{
  dropdownToggle: boolean
  setDropdownToggle: (dropdownToggle: boolean) => void
}>({
  dropdownToggle: false,
  setDropdownToggle: () => {}
})

export default function MenuDropdown(props: MenuDropdownProps) {
  const { buttonChild, children } = props

  const [dropdownToggle, setDropdownToggle] = useState(false)
  const [portalPosition, setPortalPosition] = useState({ x: 0, y: 0 })

  const buttonNodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscapeDropdown = (e: KeyboardEvent) => {
      if (!dropdownToggle) return

      if (e.key === "Escape") {
        setDropdownToggle(!dropdownToggle)
      }
    }

    const handleDropdown = (e: MouseEvent) => {
      if (!dropdownToggle) return

      const rect = buttonNodeRef.current?.getBoundingClientRect()
      setPortalPosition({
        x: rect!.x,
        y: rect!.bottom
      })

      const pointedTarget = (e.target as HTMLDivElement).offsetParent
      if (!pointedTarget || pointedTarget === document.body) {
        setDropdownToggle(false)
      }
    }

    const handlePortalPosition = () => {
      if (!dropdownToggle) return

      const rect = buttonNodeRef.current?.getBoundingClientRect()

      setPortalPosition({ x: rect!.right - rect!.width, y: rect!.bottom })
    }

    window.addEventListener("click", handleDropdown)
    window.addEventListener("keydown", handleEscapeDropdown)
    window.addEventListener("resize", handlePortalPosition)

    return () => {
      window.removeEventListener("click", handleDropdown)
      window.removeEventListener("keydown", handleEscapeDropdown)
      window.removeEventListener("resize", handlePortalPosition)
    }
  }, [dropdownToggle, setDropdownToggle, portalPosition, setPortalPosition])

  return (
    <div id="menu-dropdown" className="relative grid place-items-center">
      <MenuDropdownContext.Provider
        value={{ dropdownToggle, setDropdownToggle }}
      >
        <div ref={buttonNodeRef}>{buttonChild}</div>
        <Portal>
          <div
            id="menu-contents"
            role="menu"
            className="p-2 transition-opacity bg-white border border-red-100 rounded-md shadow-md"
            style={{
              transform: `translate3d(${portalPosition.x}px, ${
                portalPosition.y + 8
              }px, 0px)`,
              opacity: !dropdownToggle ? 0 : 1
            }}
          >
            {!dropdownToggle ? null : children}
          </div>
        </Portal>
      </MenuDropdownContext.Provider>
    </div>
  )
}
