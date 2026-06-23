"use client"

import ArtworkGrid from "@/components/ArtworkGrid"
import GalleryToolbar from "@/components/gallery/GalleryToolbar"
import DeleteArtworkDialog from "@/components/DeleteArtworkDialog"
import FolderView from "@/components/layouts/Folders"
import { renderFolderTree } from "@/components/layouts/Folders/FolderTree"
import type { Artwork, Folder } from "@/types/characters"
import { filterByFolder } from "@/utils/folderUtils"
import {
  filterNsfwArtworks,
  searchArtworks,
  sortArtworks,
  type GallerySort,
} from "@/utils/galleryUtils"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

export default function StudioGallery({
  artworks: initialArtworks,
  folders,
}: {
  artworks: Artwork[]
  folders: Folder[]
}) {
  const router = useRouter()
  const [items, setItems] = useState(initialArtworks)
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [artworkToDelete, setArtworkToDelete] = useState<Artwork | null>(null)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<GallerySort>("newest")
  const [hideNsfw, setHideNsfw] = useState(false)

  useEffect(() => {
    setItems(initialArtworks)
  }, [initialArtworks])

  const filteredArtworks = useMemo(() => {
    const inFolder = filterByFolder(items, selectedFolderId)
    const searched = searchArtworks(inFolder, search)
    const nsfwFiltered = filterNsfwArtworks(searched, hideNsfw)
    return sortArtworks(nsfwFiltered, sort)
  }, [items, selectedFolderId, search, hideNsfw, sort])

  const handleDeleted = () => {
    if (!artworkToDelete) return
    setItems((current) =>
      current.filter((item) => item.id !== artworkToDelete.id)
    )
    setArtworkToDelete(null)
    router.refresh()
  }

  return (
    <>
      <FolderView>
        {folders.length > 0 ? (
          <FolderView.Shelf
            defaultName="All images"
            selectedFolderId={selectedFolderId}
            onSelectFolder={setSelectedFolderId}
            galleryStyle
          >
            {renderFolderTree({
              folders,
              selectedFolderId,
              onSelectFolder: setSelectedFolderId,
              owner: false,
              onCreateNested: () => {},
            })}
          </FolderView.Shelf>
        ) : null}

        <FolderView.Contents>
          <GalleryToolbar
            search={search}
            onSearchChange={setSearch}
            sort={sort}
            onSortChange={setSort}
            hideNsfw={hideNsfw}
            onHideNsfwChange={setHideNsfw}
            searchPlaceholder="Search"
          />

          {filteredArtworks.length > 0 ? (
            <ArtworkGrid
              artworks={filteredArtworks}
              className="gap-5"
              editable
              showMetadata
              onDelete={(artwork) => setArtworkToDelete(artwork)}
            />
          ) : (
            <div className="text-muted-foreground text-sm">
              {items.length === 0
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

      <DeleteArtworkDialog
        artwork={artworkToDelete}
        open={!!artworkToDelete}
        onOpenChange={(open) => !open && setArtworkToDelete(null)}
        onDeleted={handleDeleted}
      />
    </>
  )
}
