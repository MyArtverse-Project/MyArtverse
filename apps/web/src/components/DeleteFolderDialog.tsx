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
import type { Folder } from "@/types/characters"
import { deleteFolder } from "@/utils/api"
import { useState } from "react"

export default function DeleteFolderDialog({
  folder,
  open,
  onOpenChange,
  onDeleted,
}: {
  folder: Pick<Folder, "id" | "name"> | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeleted: () => void
}) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!folder) return

    setLoading(true)
    try {
      await deleteFolder(folder.id)
      onDeleted()
      onOpenChange(false)
    } catch (err) {
      console.error("Failed to delete folder", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete folder?</AlertDialogTitle>
          <AlertDialogDescription>
            {folder?.name
              ? `"${folder.name}" and any nested folders will be deleted. Items inside will move back to the main list.`
              : "This folder will be deleted. Items inside will move back to the main list."}
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
            {loading ? "Deleting…" : "Delete folder"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
