"use client"

import CreateFolderModal from "@/components/Modals/CreateFolder"
import MoveCharacterMenu from "@/components/MoveCharacterMenu"
import { CharacterCard } from "@/components/layouts/Cards"
import FolderView from "@/components/layouts/Folders"
import { renderFolderTree } from "@/components/layouts/Folders/FolderTree"
import { SearchBox } from "@/components/layouts/Forms"
import GridResponsive from "@/components/layouts/Layouts/GridResponsive"
import type { Character, CharacterResponse, Folder } from "@/types/characters"
import { folderColors } from "@/utils/constants"
import { filterByFolder } from "@/utils/folderUtils"
import {
  setFolderDragData,
  type FolderDragPayload,
} from "@/utils/folderDrag"
import { assignCharacterToFolder } from "@/utils/api"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { LuFilter as FilterIcon, LuCog, LuPlus } from "react-icons/lu"

export default function CharacterView({
  handle,
  characters: initialCharacters,
  folders,
  owner = false,
}: {
  handle: string
  characters: CharacterResponse
  folders: Folder[]
  owner: boolean
}) {
  const router = useRouter()
  const [characters, setCharacters] = useState(initialCharacters)
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [createFolderModal, setFolderModalState] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [parentFolderId, setParentFolderId] = useState<string | null>(null)

  const filteredCharacters = useMemo(
    () => filterByFolder(characters.characters, selectedFolderId),
    [characters.characters, selectedFolderId]
  )

  const openCreateFolder = (parentId: string | null = null) => {
    setParentFolderId(parentId)
    setFolderModalState(true)
  }

  const handleMoved = (characterId: string, folderId: string | null) => {
    setCharacters((current) => ({
      ...current,
      characters: current.characters.map((character) =>
        character.id === characterId
          ? {
              ...character,
              folder: folderId ? { id: folderId, name: "" } : null,
            }
          : character
      ),
    }))
    router.refresh()
  }

  const handleDropToFolder = async (
    folderId: string | null,
    payload: FolderDragPayload
  ) => {
    if (!owner || payload.kind !== "character") return

    const character = characters.characters.find((item) => item.id === payload.id)
    if (!character) return

    const currentFolderId = character.folder?.id ?? null
    if (currentFolderId === folderId) return

    try {
      await assignCharacterToFolder(payload.id, folderId)
      handleMoved(payload.id, folderId)
    } catch (error) {
      console.error("Failed to move character", error)
    }
  }

  return (
    <FolderView>
      <FolderView.Shelf
        defaultName="All characters"
        selectedFolderId={selectedFolderId}
        onSelectFolder={setSelectedFolderId}
        acceptKinds={owner ? ["character"] : undefined}
        onDropItem={owner ? handleDropToFolder : undefined}
      >
        {renderFolderTree({
          folders,
          selectedFolderId,
          onSelectFolder: setSelectedFolderId,
          owner,
          onCreateNested: (parentId) => openCreateFolder(parentId),
          acceptKinds: owner ? ["character"] : undefined,
          onDropItem: owner ? handleDropToFolder : undefined,
        })}
        {owner ? (
          <FolderView.Item newItem onClick={() => openCreateFolder(null)} />
        ) : null}
      </FolderView.Shelf>
      <FolderView.Contents>
        <div className="mb-4 flex w-full gap-x-2.5">
          <div className="max-w-full flex-grow">
            <SearchBox placeholder="Search for characters" />
          </div>
          <Button className="gap-2">
            <FilterIcon size={20} />
            Filter
          </Button>
          {owner && (
            <>
              <Button
                className="gap-2"
                onClick={() => router.push("/dashboard/characters")}
              >
                <LuCog size={20} />
                Manage Character
              </Button>
              <Button
                className="gap-2"
                onClick={() =>
                  router.push("/studio/characters?createModal=true")
                }
              >
                <LuPlus size={20} />
                Create Character
              </Button>
            </>
          )}
        </div>

        <GridResponsive breakpoint={250} className="gap-1.5" role="listbox">
          {filteredCharacters.map((character) => (
            <div
              key={character.id}
              className="group relative cursor-grab active:cursor-grabbing"
              draggable={owner}
              onDragStart={(event) => {
                setFolderDragData(event, { kind: "character", id: character.id })
              }}
            >
              <CharacterCard
                id={character.id}
                character={character}
                img={character.avatarUrl || "/UserProfile.png"}
                name={character.name}
                species={character.species}
                status="owned"
                href={`/@${handle}/${character.slug}`}
              />
              {owner ? (
                <MoveCharacterMenu
                  character={character}
                  folders={folders}
                  onMoved={handleMoved}
                />
              ) : null}
            </div>
          ))}
        </GridResponsive>
      </FolderView.Contents>
      {owner ? (
        <CreateFolderModal
          createFolderModal={createFolderModal}
          toggleCreateFolderModal={() => {
            setFolderModalState(false)
            setParentFolderId(null)
          }}
          colors={folderColors}
          parentId={parentFolderId}
          category="characters"
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      ) : null}
    </FolderView>
  )
}
