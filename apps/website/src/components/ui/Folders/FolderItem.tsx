"use client"

import { Children, useEffect, useRef, useState } from "react"
import { useScrollBounds } from "@/hooks"
import cn from "@/utils/cn"
import { motion } from "framer-motion"
import {
  LuFolder as Folder,
  LuFolderClosed as FolderClosed,
  LuFolderOpen as FolderOpen,
  LuFolderPlus as FolderPlus
} from "react-icons/lu"
import type { MapElement } from "@/types/utils"
import { Button } from "../Buttons"

export default function FolderItem({
  children,
  name,
  open = false,
  expanded = false,
  nestedItem,
  newItem,
  ...attributes
}: {
  children?: React.ReactNode
  name?: string
  open?: boolean
  expanded?: boolean
  nestedItem?: boolean
  newItem?: boolean
  /** WIP */
  color?: string
} & Pick<React.HTMLAttributes<MapElement<"div">>, "onClick">) {
  const childrenCount = Children.count(children)

  const [isExpand, setIsExpand] = useState(expanded)
  const [expandedHeight, setExpandedHeight] = useState(0)

  const collapsibleRef = useRef<React.ElementRef<"div">>(null)
  const toggleButtonRef = useRef<React.ElementRef<"button">>(null)

  const DynamicFolderIcon = children
    ? !isExpand
      ? FolderClosed
      : FolderOpen
    : newItem
      ? FolderPlus
      : Folder

  if (newItem && expanded) {
    throw new Error(
      "Props `expanded` and `newItem` not possible; use either one of them but not at the same time."
    )
  }

  if (newItem && name) {
    throw new Error(
      "Props `name` and `newItem` not possible; use either one of them but not at the same time."
    )
  }

  const { height: collapsibleHeight } = useScrollBounds(collapsibleRef)

  useEffect(() => {
    const toggleButton = toggleButtonRef.current

    const handleCollapseState = () => {
      if (!children) return

      setExpandedHeight(collapsibleHeight)
      return
    }

    handleCollapseState()
    toggleButton.addEventListener("click", handleCollapseState)

    return () => {
      toggleButton.removeEventListener("click", handleCollapseState)
    }
  }, [children, isExpand, collapsibleHeight])

  return (
    <div
      className={cn(!nestedItem ? "w-full" : "relative w-full")}
      aria-expanded={!children ? undefined : isExpand}
      // Data attribute for debugging purposes in production
      {...attributes}
    >
      <Button
        ref={toggleButtonRef}
        onClick={() => setIsExpand(!isExpand)}
        aria-label={
          !children
            ? `Folder item: ${name}`
            : `Folder item: ${name}, folder contains ${childrenCount} items`
        }
        className={cn(
          "flex w-full cursor-pointer flex-row items-center rounded-md px-3 py-2 font-semibold transition-all",
          !open ? "hover:text-500 hover:bg-200" : "bg-500 text-active",
          !newItem ? "opacity-100" : "opacity-50 hover:opacity-100"
        )}
        prefixIcon={<DynamicFolderIcon aria-hidden size={21} className="mr-2" />}
      >
        {newItem ? "New folder" : name}
      </Button>
      {/* Nested items go here */}
      <motion.div
        ref={collapsibleRef}
        initial={{ height: 0 }}
        animate={{
          height: !isExpand ? 0 : expandedHeight
        }}
        className={cn(children ? "relative overflow-hidden pl-6" : "")}
      >
        {children}
      </motion.div>
    </div>
  )
}
