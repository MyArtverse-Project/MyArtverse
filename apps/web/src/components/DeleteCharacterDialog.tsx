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
import type { Character } from "@/types/characters"
import { deleteCharacter } from "@/utils/api"
import { useState } from "react"

export default function DeleteCharacterDialog({
  character,
  open,
  onOpenChange,
  onDeleted,
}: {
  character: Pick<Character, "id" | "name"> | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeleted: () => void
}) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!character) return

    setLoading(true)
    try {
      await deleteCharacter(character.id)
      onDeleted()
      onOpenChange(false)
    } catch (err) {
      console.error("Failed to delete character", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete character?</AlertDialogTitle>
          <AlertDialogDescription>
            {character?.name
              ? `"${character.name}" and their reference sheets will be permanently deleted. This cannot be undone.`
              : "This character will be permanently deleted. This cannot be undone."}
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
            {loading ? "Deleting…" : "Delete character"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
