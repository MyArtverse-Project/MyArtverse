"use client"

import { useScrollBounds } from "@/hooks"
import type { MapElement } from "@/types/utils"
import {
  acceptsFolderDrag,
  FOLDER_DRAG_MIME,
  readFolderDragData,
  type FolderDragKind,
  type FolderDragPayload,
} from "@/utils/folderDrag"
import { cn } from "@mav/shared/utils"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Children, useEffect, useRef, useState } from "react"
import {
  LuChevronRight,
  LuFolder as Folder,
  LuFolderClosed as FolderClosed,
  LuFolderOpen as FolderOpen,
  LuFolderPlus as FolderPlus,
  LuTrash2,
} from "react-icons/lu"

export default function FolderItem({
  children,
  name,
  folderId,
  open = false,
  expanded = false,
  nestedItem,
  newItem,
  selected = false,
  onSelect,
  color,
  acceptKinds,
  onDropItem,
  onDelete,
  ...attributes
}: {
  children?: React.ReactNode
  name?: string
  folderId?: string
  open?: boolean
  expanded?: boolean
  nestedItem?: boolean
  newItem?: boolean
  selected?: boolean
  onSelect?: () => void
  color?: string
  acceptKinds?: FolderDragKind[]
  onDropItem?: (folderId: string | null, payload: FolderDragPayload) => void
  onDelete?: (folderId: string) => void
} & Pick<React.HTMLAttributes<MapElement<"div">>, "onClick">) {
  const childrenCount = Children.count(children)
  const hasNestedFolders = childrenCount > 0

  const [isExpand, setIsExpand] = useState(expanded)
  const [expandedHeight, setExpandedHeight] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)

  const collapsibleRef = useRef<React.ElementRef<"div">>(null)
  const canDrop = !newItem && !!onDropItem

  const DynamicFolderIcon = hasNestedFolders
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

  const { height: collapsibleHeight } = useScrollBounds(
    collapsibleRef,
    hasNestedFolders && isExpand
  )

  useEffect(() => {
    setExpandedHeight(collapsibleHeight)
  }, [children, isExpand, collapsibleHeight])

  const handleSelect = () => {
    if (newItem) {
      attributes.onClick?.({} as React.MouseEvent<HTMLDivElement>)
      return
    }
    onSelect?.()
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    if (!canDrop || !event.dataTransfer.types.includes(FOLDER_DRAG_MIME)) return

    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
    setIsDragOver(true)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (!canDrop) return

    event.preventDefault()
    setIsDragOver(false)

    const payload = readFolderDragData(event)
    if (!payload || !acceptsFolderDrag(payload, acceptKinds)) return

    onDropItem?.(folderId ?? null, payload)
  }

  return (
    <div
      className={cn(!nestedItem ? "w-full" : "relative w-full")}
      aria-expanded={hasNestedFolders ? isExpand : undefined}
      {...attributes}
    >
      <div
        className={cn(
          "group/folder flex w-full items-center gap-1 rounded-md px-1 py-1 transition-all",
          (selected || open) && "bg-accent text-accent-foreground",
          isDragOver && "bg-primary/10 ring-primary ring-2"
        )}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        {hasNestedFolders ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-7 shrink-0"
            aria-label={isExpand ? "Collapse folder" : "Expand folder"}
            onClick={(e) => {
              e.stopPropagation()
              setIsExpand(!isExpand)
            }}
          >
            <LuChevronRight
              size={16}
              className={cn("transition-transform", isExpand && "rotate-90")}
            />
          </Button>
        ) : (
          <span className="size-7 shrink-0" />
        )}

        <button
          type="button"
          onClick={handleSelect}
          aria-label={newItem ? "Create new folder" : `Folder item: ${name}`}
          className={cn(
            "hover:bg-muted/60 flex min-w-0 flex-1 items-center rounded-md px-2 py-1.5 text-left font-semibold transition-colors",
            newItem && "opacity-50 hover:opacity-100"
          )}
        >
          {color ? (
            <span
              className="mr-2 size-3 shrink-0 rounded-full border border-border/50"
              style={{ backgroundColor: color }}
              aria-hidden
            />
          ) : null}
          <DynamicFolderIcon aria-hidden size={18} className="mr-2 shrink-0" />
          <span className="truncate">{newItem ? "New folder" : name}</span>
        </button>

        {!newItem && folderId && onDelete ? (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="size-7 shrink-0 opacity-0 transition-opacity group-hover/folder:opacity-100"
            aria-label={`Delete folder ${name}`}
            onClick={(event) => {
              event.stopPropagation()
              onDelete(folderId)
            }}
          >
            <LuTrash2 size={15} />
          </Button>
        ) : null}
      </div>

      {hasNestedFolders ? (
        <motion.div
          ref={collapsibleRef}
          initial={{ height: 0 }}
          animate={{
            height: !isExpand ? 0 : expandedHeight,
          }}
          className="relative overflow-hidden pl-6"
        >
          {children}
        </motion.div>
      ) : null}
    </div>
  )
}
