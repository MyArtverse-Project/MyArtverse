"use client"

import { useState, useEffect, useRef } from "react"
import {
  LuPanelLeftClose as PanelLeftClose,
  LuPanelLeftOpen as PanelLeftOpen
} from "react-icons/lu"
import { useFolderViewContext } from "./FolderViewProvider"
import { Button } from "../Buttons"
import FolderItem from "./FolderItem"
import Separator from "../Separator"

export default function FolderShelf({
  children,
  defaultName
}: {
  children: React.ReactNode
  defaultName?: string
}) {
  const { folderWidth, setFolderWidth } = useFolderViewContext()

  const [isDragging, setIsDragging] = useState(false)
  const resizableRef = useRef<HTMLDivElement | null>(null)
  const folderViewRef = useRef<HTMLDivElement | null>(null)

  const DEFAULT_WIDTH = 270
  const MAX_WIDTH = 375

  useEffect(() => {
    const resizeArea = resizableRef.current
    const folderView = folderViewRef.current

    const dragMeDaddy = (e: MouseEvent) => {
      if (!isDragging) return

      const rect = folderView.getBoundingClientRect()
      const calcMousePosition = e.x - rect.x + 13

      if (calcMousePosition < 250 || calcMousePosition > 600) return

      setFolderWidth(calcMousePosition)
    }

    window.addEventListener("mousemove", dragMeDaddy)

    const resetPosition = () => {
      setFolderWidth(DEFAULT_WIDTH)
    }

    const setDraggingTrue = () => {
      setIsDragging(true)
    }

    const setDraggingFalse = () => {
      setIsDragging(false)
    }

    resizeArea.addEventListener("dblclick", resetPosition)

    resizeArea.addEventListener("mousedown", setDraggingTrue)
    window.addEventListener("mouseup", setDraggingFalse)

    return () => {
      window.removeEventListener("mousemove", dragMeDaddy)
      resizeArea.removeEventListener("dblclick", resetPosition)
      resizeArea.removeEventListener("mousedown", setDraggingTrue)
      window.removeEventListener("mouseup", setDraggingFalse)
    }
  }, [isDragging, setIsDragging, setFolderWidth])

  const expandThreshold = folderWidth > MAX_WIDTH

  const handleExpandDetails = () => {
    if (!expandThreshold) {
      setFolderWidth(MAX_WIDTH + 1)
      return
    }

    setFolderWidth(DEFAULT_WIDTH)
  }

  const PanelIconDynamic = expandThreshold ? PanelLeftClose : PanelLeftOpen
  const panelStateAria = !expandThreshold
    ? "Expand folder menu"
    : "Collapse folder menu"

  return (
    <div
      className="flex-shrink-0 flex"
      ref={folderViewRef}
      style={{ width: folderWidth }}
    >
      <aside className="grid gap-y-1.5 w-full h-fit sticky top-32">
        <span className="flex gap-2.5 items-center flex-row-reverse">
          <div>
            <Button
              aria-label={panelStateAria}
              iconOnly
              prefixIcon={<PanelIconDynamic size={21} />}
              className="p-2 rounded-md transition-colors hover:bg-200 hover:text-500"
              onClick={handleExpandDetails}
            />
          </div>
          <FolderItem name={defaultName} open />
        </span>
        <Separator dir="horizontal" padding="0.25rem" />
        {children}
      </aside>
      <span
        ref={resizableRef}
        className="hover:cursor-e-resize px-2 mx-1 h-full before:block before:w-0.5 before:h-full before:bg-separator before:transition-opacity before:opacity-25 before:hover:opacity-100"
      />
    </div>
  )
}
