"use client"

import {
  type ReactElement,
  useState,
  useEffect,
  createContext,
  useRef
} from "react"
import dynamic from "next/dynamic"

import { motion } from "framer-motion"
import type { ChildrenNode } from "@/types"

const Portal = dynamic(() => import("../Portal"), { ssr: false })

interface DropdownProps extends Required<ChildrenNode> {
  id: string
  right?: boolean
  buttonChild: ReactElement<HTMLButtonElement>
  state?: boolean
}

export const DropdownContext = createContext<{
  dropdownToggle: boolean
  setDropdownToggle: (dropdownToggle: boolean) => void
}>({
  dropdownToggle: false,
  setDropdownToggle: () => {}
})

export default function Dropdown(props: DropdownProps) {
  const { id, right, buttonChild, children } = props

  const [dropdownToggle, setDropdownToggle] = useState(false)
  const [toggleVisible, setToggleVisible] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 })

  const buttonNodeRef = useRef<HTMLDivElement>(null)

  const mdFormat = `md:${id}`

  useEffect(() => {
    const handleRectPosition = (elTarget: React.RefObject<HTMLElement>) => {
      const windowWidth = window.visualViewport!.width

      const targetRect = elTarget.current!.getBoundingClientRect()
      const buttonRect = buttonNodeRef.current?.getBoundingClientRect()

      setDropdownPosition({
        x: right
          ? windowWidth - buttonRect!.x - buttonRect!.width
          : targetRect!.x,
        y: targetRect!.bottom
      })
    }

    const handleEscapeDropdown = (e: KeyboardEvent) => {
      if (!dropdownToggle) return

      if (e.key === "Escape") {
        setDropdownToggle(!dropdownToggle)
      }
    }

    const handleDropdown = (e: MouseEvent) => {
      if (!dropdownToggle) return

      handleRectPosition(buttonNodeRef)

      const target = e.target as HTMLElement
      const pointedTarget = target.offsetParent as HTMLElement

      if (pointedTarget) {
        if (pointedTarget.id === "dropdown-contents") return

        if (pointedTarget.id !== mdFormat) {
          setDropdownToggle(false)
        }
      }
    }

    const handledropdownPosition = () => {
      if (!dropdownToggle) return

      handleRectPosition(buttonNodeRef)
    }

    window.addEventListener("click", handleDropdown)
    window.addEventListener("keydown", handleEscapeDropdown)
    window.addEventListener("resize", handledropdownPosition)

    return () => {
      window.removeEventListener("click", handleDropdown)
      window.removeEventListener("keydown", handleEscapeDropdown)
      window.removeEventListener("resize", handledropdownPosition)
    }
  }, [
    dropdownToggle,
    setDropdownToggle,
    dropdownPosition,
    setDropdownPosition,
    mdFormat,
    right
  ])

  useEffect(() => {
    dropdownToggle
      ? setToggleVisible(true)
      : setTimeout(() => {
          setToggleVisible(false)
        }, 400)
  }, [dropdownToggle, setToggleVisible])

  return (
    <div id={mdFormat} className="relative">
      <DropdownContext.Provider value={{ dropdownToggle, setDropdownToggle }}>
        <div ref={buttonNodeRef}>{buttonChild}</div>
        <Portal>
          {!toggleVisible ? null : (
            <motion.div
              id="dropdown-contents"
              initial={{ opacity: 0 }}
              animate={{
                opacity: !dropdownToggle ? 0 : 1
              }}
              transition={{
                ease: "easeInOut",
                duration: 0.115,
                delay: 0.01
              }}
              aria-describedby={mdFormat}
              className="p-2 bg-white border border-red-100 rounded-md shadow-xl"
              style={{
                position: "fixed",
                left: right ? "unset" : dropdownPosition.x,
                top: dropdownPosition.y + 8,
                right: right ? dropdownPosition.x : "unset",
                display: !toggleVisible ? "none" : "block"
              }}
              role="menu"
            >
              {children}
            </motion.div>
          )}
        </Portal>
      </DropdownContext.Provider>
    </div>
  )
}
