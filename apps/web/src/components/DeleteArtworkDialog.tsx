"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Artwork } from "@/types/characters"
import { deleteArtwork } from "@/utils/api"
import { useState } from "react"

export default function DeleteArtworkDialog({
  artwork,
  open,
  onOpenChange,
  onDeleted,
}: {
  artwork: Artwork | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeleted: () => void
}) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!artwork) return

    setLoading(true)
    try {
      await deleteArtwork(artwork.id)
      onDeleted()
      onOpenChange(false)
    } catch (err) {
      console.error("Delete failed", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete artwork?</AlertDialogTitle>
          <AlertDialogDescription>
            {artwork?.title
              ? `"${artwork.title}" will be permanently deleted. This cannot be undone.`
              : "This artwork will be permanently deleted. This cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              void handleDelete()
            }}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? "Deleting…" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
