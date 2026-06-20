"use client"

import ArtworkGrid from "@/components/ArtworkGrid"
import CreateFolderModal from "@/components/Modals/CreateFolder"
import FolderView from "@/components/layouts/Folders"
import { renderFolderTree } from "@/components/layouts/Folders/FolderTree"
import type { Artwork, Folder } from "@/types/characters"
import { folderColors } from "@/utils/constants"
import { filterByFolder } from "@/utils/folderUtils"
import type { FolderDragPayload } from "@/utils/folderDrag"
import { assignArtworkToFolder } from "@/utils/api"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { LuPlus, LuUpload } from "react-icons/lu"

export default function GalleryView({
  characterId,
  artworks: initialArtworks,
  folders,
  owner,
}: {
  characterId: string
  artworks: Artwork[]
  folders: Folder[]
  owner: boolean
}) {
  const router = useRouter()
  const [artworks, setArtworks] = useState(initialArtworks)
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [createFolderModal, setCreateFolderModal] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [parentFolderId, setParentFolderId] = useState<string | null>(null)

  const filteredArtworks = useMemo(
    () => filterByFolder(artworks, selectedFolderId),
    [artworks, selectedFolderId]
  )

  const openCreateFolder = (parentId: string | null = null) => {
    setParentFolderId(parentId)
    setCreateFolderModal(true)
  }

  const handleMoved = (artworkId: string, folderId: string | null) => {
    setArtworks((current) =>
      current.map((artwork) =>
        artwork.id === artworkId
          ? {
              ...artwork,
              folderId,
              folder: folderId ? { id: folderId, name: "" } : null,
            }
          : artwork
      )
    )
    router.refresh()
  }

  const handleDropToFolder = async (
    folderId: string | null,
    payload: FolderDragPayload
  ) => {
    if (!owner || payload.kind !== "artwork") return

    const artwork = artworks.find((item) => item.id === payload.id)
    if (!artwork) return

    const currentFolderId = artwork.folderId ?? artwork.folder?.id ?? null
    if (currentFolderId === folderId) return

    try {
      await assignArtworkToFolder(payload.id, folderId)
      handleMoved(payload.id, folderId)
    } catch (error) {
      console.error("Failed to move artwork", error)
    }
  }

  return (
    <FolderView>
      <FolderView.Shelf
        defaultName="All artworks"
        selectedFolderId={selectedFolderId}
        onSelectFolder={setSelectedFolderId}
        acceptKinds={owner ? ["artwork"] : undefined}
        onDropItem={owner ? handleDropToFolder : undefined}
      >
        {renderFolderTree({
          folders,
          selectedFolderId,
          onSelectFolder: setSelectedFolderId,
          owner,
          onCreateNested: (parentId) => openCreateFolder(parentId),
          acceptKinds: owner ? ["artwork"] : undefined,
          onDropItem: owner ? handleDropToFolder : undefined,
        })}
        {owner ? <FolderView.Item newItem onClick={() => openCreateFolder(null)} /> : null}
      </FolderView.Shelf>

      <FolderView.Contents>
        <div className="mb-4 flex w-full flex-wrap gap-2 justify-end">
          {owner ? (
            <Button className="gap-2" asChild>
              <Link href={`/studio/gallery/upload?characterId=${characterId}`}>
                <LuUpload size={18} />
                Upload Artwork
              </Link>
            </Button>
          ) : null}
          {owner ? (
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => openCreateFolder(null)}
            >
              <LuPlus size={18} />
              New folder
            </Button>
          ) : null}
        </div>

        {filteredArtworks.length > 0 ? (
          <ArtworkGrid
            artworks={filteredArtworks}
            className="gap-1.5"
            manageable={owner}
            folders={folders}
            onMoved={handleMoved}
          />
        ) : (
          <div className="text-muted-foreground text-sm">
            {selectedFolderId
              ? "No artworks in this folder."
              : "No artworks found."}
          </div>
        )}
      </FolderView.Contents>

      {owner ? (
        <CreateFolderModal
          createFolderModal={createFolderModal}
          toggleCreateFolderModal={() => {
            setCreateFolderModal(false)
            setParentFolderId(null)
          }}
          colors={folderColors}
          parentId={parentFolderId}
          category="artworks"
          characterId={characterId}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      ) : null}
    </FolderView>
  )
}
