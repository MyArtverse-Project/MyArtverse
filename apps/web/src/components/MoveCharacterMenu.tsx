"use client"

import type { Character, Folder } from "@/types/characters"
import { assignCharacterToFolder } from "@/utils/api"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LuFolderInput } from "react-icons/lu"

function flattenFolders(folders: Folder[]): Folder[] {
  return folders.flatMap((folder) => [
    folder,
    ...(folder.children ? flattenFolders(folder.children) : []),
  ])
}

export default function MoveCharacterMenu({
  character,
  folders,
  onMoved,
}: {
  character: Character
  folders: Folder[]
  onMoved?: (characterId: string, folderId: string | null) => void
}) {
  const flatFolders = flattenFolders(folders)

  const handleAssign = async (folderId: string | null) => {
    try {
      await assignCharacterToFolder(character.id, folderId)
      onMoved?.(character.id, folderId)
    } catch (error) {
      console.error("Failed to move character", error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 z-10 size-8 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
          aria-label={`Move ${character.name} to folder`}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <LuFolderInput size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Move to folder</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => void handleAssign(null)}>
          Remove from folder
        </DropdownMenuItem>
        {flatFolders.map((folder) => (
          <DropdownMenuItem
            key={folder.id}
            onClick={() => void handleAssign(folder.id)}
          >
            {folder.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
