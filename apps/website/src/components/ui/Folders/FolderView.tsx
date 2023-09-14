"use client"

import { useRef, useState, useEffect } from "react"

import FolderItem from "./FolderItem"
import Separator from "../Separator"
import { Button } from "../Buttons"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

export default function FolderView({}: {}) {
  const resizableRef = useRef<HTMLDivElement | null>(null)
  const folderViewRef = useRef<HTMLDivElement | null>(null)

  const DEFAULT_WIDTH = 275

  const [dragQueen, setDragQueen] = useState(DEFAULT_WIDTH)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const resizeArea = resizableRef.current
    const folderView = folderViewRef.current

    const dragMeDaddy = (e: MouseEvent) => {
      if (!isDragging) return

      const rect = folderView.getBoundingClientRect()
      const mousePosition = e.x - rect.x + 13

      if (mousePosition < 250 || mousePosition > 800) return

      setDragQueen(mousePosition)
    }

    resizeArea.addEventListener("pointerdown", () => setIsDragging(true))
    window.addEventListener("pointerup", () => setIsDragging(false))

    window.addEventListener("pointermove", dragMeDaddy)

    const resetPosition = () => {
      setDragQueen(DEFAULT_WIDTH)
      return
    }

    resizeArea.addEventListener("dblclick", resetPosition)

    return () => {
      window.removeEventListener("pointermove", dragMeDaddy)
      resizeArea.removeEventListener("dblclick", resetPosition)
    }
  }, [isDragging, setIsDragging])

  const expandThreshold = dragQueen > 375

  const handleExpandDetails = () => {
    if (!expandThreshold) {
      setDragQueen(376)
      return
    }

    setDragQueen(DEFAULT_WIDTH)
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
        width: `${dragQueen}px`,
        userSelect: !isDragging ? "initial" : "none"
      }}
    >
      <div className="grid gap-y-1.5 w-full h-fit sticky top-36">
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
        <FolderItem name="Icons" active={false} />
        <FolderItem name="Commissions" active={false} />
        <FolderItem name="Adoptables" active={false} />
        <FolderItem name="Characters" active={false} />
      </div>
      <div
        ref={resizableRef}
        id="resizable-area"
        aria-hidden
        className="hover:cursor-e-resize px-2 mx-1 h-full before:block before:w-0.5 before:h-full before:bg-separator before:transition-opacity before:opacity-25 before:hover:opacity-100"
      />
    </div>
  )
}
