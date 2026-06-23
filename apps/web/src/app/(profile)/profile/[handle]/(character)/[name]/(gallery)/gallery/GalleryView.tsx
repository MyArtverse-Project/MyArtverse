"use client"

import ArtworkGrid from "@/components/ArtworkGrid"
import GalleryToolbar from "@/components/gallery/GalleryToolbar"
import CreateFolderModal from "@/components/Modals/CreateFolder"
import DeleteFolderDialog from "@/components/DeleteFolderDialog"
import FolderView from "@/components/layouts/Folders"
import { renderFolderTree } from "@/components/layouts/Folders/FolderTree"
import NsfwMedia from "@/components/NsfwMedia"
import type { Artwork, Folder } from "@/types/characters"
import { folderColors } from "@/utils/constants"
import {
  filterByFolder,
  collectDescendantIds,
  findFolderById,
  removeFolderFromTree,
} from "@/utils/folderUtils"
import type { FolderDragPayload } from "@/utils/folderDrag"
import {
  filterNsfwArtworks,
  searchArtworks,
  sortArtworks,
  type GallerySort,
  type GalleryViewMode,
} from "@/utils/galleryUtils"
import { assignArtworkToFolder } from "@/utils/api"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState, useEffect } from "react"
import { LuPlus, LuUpload } from "react-icons/lu"

export default function GalleryView({
  characterId,
  ownerHandle,
  characterSlug,
  characterName,
  characterAvatarUrl,
  artworks: initialArtworks,
  folders,
  owner,
}: {
  characterId: string
  ownerHandle: string
  characterSlug: string
  characterName: string
  characterAvatarUrl?: string
  artworks: Artwork[]
  folders: Folder[]
  owner: boolean
}) {
  const router = useRouter()
  const [artworks, setArtworks] = useState(initialArtworks)
  const [folderList, setFolderList] = useState(folders)
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [createFolderModal, setCreateFolderModal] = useState(false)
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [parentFolderId, setParentFolderId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<GallerySort>("newest")
  const [hideNsfw, setHideNsfw] = useState(false)
  const [layout, setLayout] = useState<GalleryViewMode>("grid")

  useEffect(() => {
    setFolderList(folders)
  }, [folders])

  useEffect(() => {
    setArtworks(initialArtworks)
  }, [initialArtworks])

  const filteredArtworks = useMemo(() => {
    const inFolder = filterByFolder(artworks, selectedFolderId)
    const searched = searchArtworks(inFolder, search)
    const nsfwFiltered = filterNsfwArtworks(searched, hideNsfw)
    return sortArtworks(nsfwFiltered, sort)
  }, [artworks, selectedFolderId, search, hideNsfw, sort])

  const characterMeta = useMemo(
    () => ({
      name: characterName,
      avatarUrl: characterAvatarUrl,
    }),
    [characterName, characterAvatarUrl]
  )

  const openCreateFolder = (parentId: string | null = null) => {
    setParentFolderId(parentId)
    setCreateFolderModal(true)
  }

  const requestDeleteFolder = (folderId: string) => {
    const folder = findFolderById(folderList, folderId)
    if (folder) setFolderToDelete(folder)
  }

  const handleFolderDeleted = () => {
    if (!folderToDelete) return

    const deletedIds = new Set(collectDescendantIds(folderToDelete))
    setFolderList((current) => removeFolderFromTree(current, folderToDelete.id))
    setArtworks((current) =>
      current.map((artwork) => {
        const artworkFolderId = artwork.folderId ?? artwork.folder?.id ?? null
        if (!artworkFolderId || !deletedIds.has(artworkFolderId)) return artwork
        return { ...artwork, folderId: null, folder: null }
      })
    )
    if (selectedFolderId && deletedIds.has(selectedFolderId)) {
      setSelectedFolderId(null)
    }
    setFolderToDelete(null)
    router.refresh()
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

  const artworkHref = (artwork: Artwork) =>
    `/@${ownerHandle}/${characterSlug}/gallery/${artwork.id}`

  return (
    <FolderView>
      <FolderView.Shelf
        defaultName="All artworks"
        selectedFolderId={selectedFolderId}
        onSelectFolder={setSelectedFolderId}
        acceptKinds={owner ? ["artwork"] : undefined}
        onDropItem={owner ? handleDropToFolder : undefined}
        galleryStyle
      >
        {renderFolderTree({
          folders: folderList,
          selectedFolderId,
          onSelectFolder: setSelectedFolderId,
          owner,
          onCreateNested: (parentId) => openCreateFolder(parentId),
          onDeleteFolder: requestDeleteFolder,
          acceptKinds: owner ? ["artwork"] : undefined,
          onDropItem: owner ? handleDropToFolder : undefined,
        })}
        {owner ? <FolderView.Item newItem onClick={() => openCreateFolder(null)} /> : null}
      </FolderView.Shelf>

      <FolderView.Contents>
        {owner ? (
          <div className="mb-4 flex w-full flex-wrap justify-end gap-2">
            <Button className="gap-2" asChild>
              <Link href={`/studio/gallery/upload?characterId=${characterId}`}>
                <LuUpload size={18} />
                Upload Artwork
              </Link>
            </Button>
          </div>
        ) : null}
        <GalleryToolbar
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          hideNsfw={hideNsfw}
          onHideNsfwChange={setHideNsfw}
          showViewToggle
          view={layout}
          onViewChange={setLayout}
        />

        

        {filteredArtworks.length > 0 ? (
          layout === "grid" ? (
            <ArtworkGrid
              artworks={filteredArtworks}
              className="gap-5"
              manageable={owner}
              folders={folderList}
              onMoved={handleMoved}
              viewHref={artworkHref}
              showMetadata
              characterMeta={characterMeta}
            />
          ) : (
            <ul className="divide-border divide-y">
              {filteredArtworks.map((artwork) => (
                <li key={artwork.id}>
                  <Link
                    href={artworkHref(artwork)}
                    className="hover:bg-muted/40 flex items-center gap-4 rounded-lg px-2 py-3 transition-colors"
                  >
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                      <NsfwMedia
                        src={artwork.artworkUrl!}
                        alt={artwork.altText ?? artwork.title ?? "Artwork"}
                        nsfw={!!artwork.nsfw}
                        fill
                        className="object-cover"
                        containerClassName="rounded-xl"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">
                        {artwork.title ?? "Untitled"}
                      </p>
                      <p className="text-muted-foreground truncate text-sm">
                        {characterName}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )
        ) : (
          <div className="text-muted-foreground text-sm">
            {selectedFolderId
              ? "No artworks in this folder."
              : search.trim()
                ? `No artworks match "${search.trim()}".`
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

      <DeleteFolderDialog
        folder={folderToDelete}
        open={!!folderToDelete}
        onOpenChange={(open) => !open && setFolderToDelete(null)}
        onDeleted={handleFolderDeleted}
      />
    </FolderView>
  )
}
