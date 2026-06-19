"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ReferenceSheet } from "@/types/characters"
import { deleteRefSheet, setRefAsMain } from "@/utils/api"
import NsfwMedia from "@/components/NsfwMedia"
import { useState } from "react"
import { LuArrowLeft } from "react-icons/lu"
import {
  getMainVariantImage,
  getMainVariantNsfw,
  refSheetListImageClassName,
} from "./refSheetUtils"

export default function ManageRefSheetModal({
  isOpen,
  onClose,
  refSheets,
  onEdit,
  onChanged,
}: {
  isOpen: boolean
  onClose: () => void
  refSheets: ReferenceSheet[]
  onEdit: (refSheet: ReferenceSheet) => void
  onChanged: () => void
}) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleSetActive = async (refSheet: ReferenceSheet) => {
    setLoadingId(refSheet.id)
    try {
      await setRefAsMain(refSheet.id)
      onChanged()
    } catch (error) {
      console.error("Failed to set active reference sheet", error)
    } finally {
      setLoadingId(null)
    }
  }

  const handleDelete = async (refSheet: ReferenceSheet) => {
    if (!confirm(`Delete "${refSheet.name}"? This cannot be undone.`)) return

    setLoadingId(refSheet.id)
    try {
      await deleteRefSheet(refSheet.id)
      onChanged()
    } catch (error) {
      console.error("Failed to delete reference sheet", error)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="border-border flex w-full max-w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl lg:max-w-3xl [&>button]:hidden"
      >
        <SheetHeader className="border-border shrink-0 space-y-0 border-b px-6 py-4 text-left">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onClose} type="button">
              <LuArrowLeft size={18} />
            </Button>
            <SheetTitle>Manage reference sheets</SheetTitle>
          </div>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-6 py-6">
          {refSheets.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No reference sheets yet. Use Add Reference Sheet to create one.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {refSheets.map((refSheet) => {
                const image = getMainVariantImage(refSheet)
                const isNsfw = getMainVariantNsfw(refSheet)
                const isLoading = loadingId === refSheet.id

                return (
                  <div
                    key={refSheet.id}
                    role="button"
                    tabIndex={isLoading ? -1 : 0}
                    onClick={() => !isLoading && onEdit(refSheet)}
                    onKeyDown={(e) => {
                      if (isLoading) return
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        onEdit(refSheet)
                      }
                    }}
                    className="border-border bg-card hover:bg-muted/30 focus-visible:ring-ring flex cursor-pointer overflow-hidden rounded-lg border transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  >
                    <div className={refSheetListImageClassName}>
                      <NsfwMedia
                        src={image}
                        alt={refSheet.name}
                        nsfw={isNsfw}
                        fill
                        editable
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{refSheet.name}</h3>
                          {refSheet.active && (
                            <Badge variant="secondary">Active</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Contains {refSheet.variants.length} variant
                          {refSheet.variants.length === 1 ? "" : "s"}
                        </p>
                      </div>
                      <div
                        className="flex flex-wrap gap-2"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        {!refSheet.active && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={isLoading}
                            onClick={() => handleSetActive(refSheet)}
                          >
                            Set active
                          </Button>
                        )}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={isLoading}
                          onClick={() => onEdit(refSheet)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          disabled={isLoading}
                          onClick={() => handleDelete(refSheet)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
