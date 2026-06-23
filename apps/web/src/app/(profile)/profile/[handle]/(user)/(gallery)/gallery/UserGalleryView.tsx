"use client"

import ArtworkGrid from "@/components/ArtworkGrid"
import GalleryToolbar from "@/components/gallery/GalleryToolbar"
import FolderView from "@/components/layouts/Folders"
import { renderFolderTree } from "@/components/layouts/Folders/FolderTree"
import NsfwMedia from "@/components/NsfwMedia"
import type { Artwork, Folder } from "@/types/characters"
import { filterByFolder } from "@/utils/folderUtils"
import {
  filterNsfwArtworks,
  resolveArtworkGalleryHref,
  searchArtworks,
  sortArtworks,
  type GallerySort,
  type GalleryViewMode,
} from "@/utils/galleryUtils"
import { assignArtworkToFolder } from "@/utils/api"
import type { FolderDragPayload } from "@/utils/folderDrag"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { LuUpload } from "react-icons/lu"

export default function UserGalleryView({
  handle,
  artworks: initialArtworks,
  folders,
  owner,
}: {
  handle: string
  artworks: Artwork[]
  folders: Folder[]
  owner: boolean
}) {
  const router = useRouter()
  const [artworks, setArtworks] = useState(initialArtworks)
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<GallerySort>("newest")
  const [hideNsfw, setHideNsfw] = useState(false)
  const [layout, setLayout] = useState<GalleryViewMode>("grid")

  useEffect(() => {
    setArtworks(initialArtworks)
  }, [initialArtworks])

  const filteredArtworks = useMemo(() => {
    const inFolder = filterByFolder(artworks, selectedFolderId)
    const searched = searchArtworks(inFolder, search)
    const nsfwFiltered = filterNsfwArtworks(searched, hideNsfw)
    return sortArtworks(nsfwFiltered, sort)
  }, [artworks, selectedFolderId, search, hideNsfw, sort])

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

  const viewHref = (artwork: Artwork) =>
    resolveArtworkGalleryHref(artwork, handle)

  const linkableArtworks = filteredArtworks.filter((artwork) => viewHref(artwork))

  return (
    <FolderView>
      {folders.length > 0 ? (
        <FolderView.Shelf
          defaultName="All images"
          selectedFolderId={selectedFolderId}
          onSelectFolder={setSelectedFolderId}
          acceptKinds={owner ? ["artwork"] : undefined}
          onDropItem={owner ? handleDropToFolder : undefined}
          galleryStyle
        >
          {renderFolderTree({
            folders,
            selectedFolderId,
            onSelectFolder: setSelectedFolderId,
            owner,
            onCreateNested: () => {},
            acceptKinds: owner ? ["artwork"] : undefined,
            onDropItem: owner ? handleDropToFolder : undefined,
          })}
        </FolderView.Shelf>
      ) : null}

      <FolderView.Contents>
         {owner ? (
          <div className="mb-4 flex w-full justify-end">
            <Button className="gap-2" asChild>
              <Link href="/studio/gallery/upload">
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

        {linkableArtworks.length > 0 ? (
          layout === "grid" ? (
            <ArtworkGrid
              artworks={linkableArtworks}
              className="gap-5"
              manageable={owner}
              folders={folders}
              onMoved={handleMoved}
              viewHref={viewHref}
              showMetadata
            />
          ) : (
            <ul className="divide-border divide-y">
              {linkableArtworks.map((artwork) => {
                const href = viewHref(artwork)
                if (!href) return null

                return (
                  <li key={artwork.id}>
                    <Link
                      href={href}
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
                          {artwork.publishedCharacter?.name ??
                            artwork.charactersFeatured?.[0]?.name ??
                            "Artwork"}
                        </p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )
        ) : (
          <div className="text-muted-foreground text-sm">
            {artworks.length === 0
              ? "No artworks found."
              : search.trim()
                ? `No artworks match "${search.trim()}".`
                : selectedFolderId
                  ? "No artworks in this folder."
                  : "No artworks found."}
          </div>
        )}
      </FolderView.Contents>
    </FolderView>
  )
}
