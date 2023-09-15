"use client"

import { useState, useEffect, useRef } from "react"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { useFolderViewContext } from "./FolderViewProvider"
import { Button } from "../Buttons"
import FolderItem from "./FolderItem"
import Separator from "../Separator"

export default function FolderShelf({
  children
}: {
  children: React.ReactNode
}) {
  const { folderWidth, setFolderWidth } = useFolderViewContext()

  const [isDragging, setIsDragging] = useState(false)

  const DEFAULT_WIDTH = 270

  const resizableRef = useRef<HTMLDivElement | null>(null)
  const folderViewRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const resizeArea = resizableRef.current
    const folderView = folderViewRef.current

    const dragMeDaddy = (e: MouseEvent) => {
      if (!isDragging) return

      const rect = folderView.getBoundingClientRect()
      const calcMousePosition = e.x - rect.x + 13

      if (calcMousePosition < 250 || calcMousePosition > 725) return

      setFolderWidth(calcMousePosition)
    }

    resizeArea.addEventListener("pointerdown", () => setIsDragging(true))
    window.addEventListener("pointerup", () => setIsDragging(false))

    window.addEventListener("pointermove", dragMeDaddy)

    const resetPosition = () => {
      setFolderWidth(DEFAULT_WIDTH)
      return
    }

    resizeArea.addEventListener("dblclick", resetPosition)

    return () => {
      window.removeEventListener("pointermove", dragMeDaddy)
      resizeArea.removeEventListener("dblclick", resetPosition)
    }
  }, [isDragging, setIsDragging, setFolderWidth])

  const expandThreshold = folderWidth > 375

  const handleExpandDetails = () => {
    if (!expandThreshold) {
      setFolderWidth(376)
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
      style={{
        width: folderWidth
      }}
    >
      <aside className="grid gap-y-1.5 w-full h-fit sticky top-32">
        <span className="flex gap-2.5 items-center flex-row-reverse">
          <div>
            <Button
              aria-label={panelStateAria}
              iconOnly
              prefixIcon={<PanelIconDynamic size={21} />}
              className="p-2 hover:text-500"
              onClick={handleExpandDetails}
            />
          </div>
          <FolderItem name="All characters" active={true} />
        </span>
        <Separator dir="horizontal" padding="0.25rem" />
        {children}
      </aside>
      <div
        ref={resizableRef}
        aria-hidden
        className="hover:cursor-e-resize px-2 mx-1 h-full before:block before:w-0.5 before:h-full before:bg-separator before:transition-opacity before:opacity-25 before:hover:opacity-100"
      />
    </div>
  )
}
