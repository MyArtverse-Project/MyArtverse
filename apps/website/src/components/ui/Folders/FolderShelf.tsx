"use client"

import { useEffect, useRef, useState } from "react"
import {
  LuPanelLeftClose as PanelLeftClose,
  LuPanelLeftOpen as PanelLeftOpen
} from "react-icons/lu"
import { Button } from "../Buttons"
import Separator from "../Separator"
import FolderItem from "./FolderItem"
import { useFolderViewContext } from "./FolderView"

export default function FolderShelf({
  children,
  defaultName
}: {
  children: React.ReactNode
  defaultName?: string
}) {
  const { folderWidth, setFolderWidth } = useFolderViewContext()

  const [isDragging, setIsDragging] = useState(false)
  const resizableRef = useRef<React.ElementRef<"div">>(null)
  const folderViewRef = useRef<React.ElementRef<"div">>(null)

  const DEFAULT_WIDTH = 270
  const MAX_WIDTH = 375

  useEffect(() => {
    const resizeArea = resizableRef.current
    const folderView = folderViewRef.current

    const handleShelfDrag = (e: MouseEvent) => {
      if (!isDragging) return

      const rect = folderView.getBoundingClientRect()
      const calcMousePosition = e.x - rect.x + 13

      if (calcMousePosition < 250 || calcMousePosition > 600) return

      setFolderWidth(calcMousePosition)
    }

    window.addEventListener("mousemove", handleShelfDrag)

    const resetPosition = () => setFolderWidth(DEFAULT_WIDTH)
    const setDraggingTrue = () => setIsDragging(true)
    const setDraggingFalse = () => setIsDragging(false)

    resizeArea.addEventListener("dblclick", resetPosition)

    resizeArea.addEventListener("mousedown", setDraggingTrue)
    window.addEventListener("mouseup", setDraggingFalse)

    return () => {
      window.removeEventListener("mousemove", handleShelfDrag)
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
  const panelStateAria = !expandThreshold ? "Expand folder menu" : "Collapse folder menu"

  return (
    <div
      data-folder-shelf=""
      className="flex flex-shrink-0"
      ref={folderViewRef}
      style={{ width: folderWidth }}
    >
      <aside className="sticky top-32 grid h-fit w-full gap-y-1.5">
        <span className="flex flex-row-reverse items-center gap-2.5">
          <div>
            <Button
              aria-label={panelStateAria}
              icon={<PanelIconDynamic size={21} />}
              className="hover:bg-200 hover:text-500 rounded-md p-2 transition-colors"
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
        className="before:bg-separator mx-1 h-full px-2 before:block before:h-full before:w-0.5 before:opacity-25 before:transition-opacity hover:cursor-e-resize before:hover:opacity-100"
      />
    </div>
  )
}
