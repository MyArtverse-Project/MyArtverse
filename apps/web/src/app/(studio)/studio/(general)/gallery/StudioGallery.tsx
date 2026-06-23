"use client"

import ArtworkGrid from "@/components/ArtworkGrid"
import GalleryToolbar from "@/components/gallery/GalleryToolbar"
import DeleteArtworkDialog from "@/components/DeleteArtworkDialog"
import type { Artwork } from "@/types/characters"
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
}: {
  artworks: Artwork[]
}) {
  const router = useRouter()
  const [items, setItems] = useState(initialArtworks)
  const [artworkToDelete, setArtworkToDelete] = useState<Artwork | null>(null)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<GallerySort>("newest")
  const [hideNsfw, setHideNsfw] = useState(false)

  useEffect(() => {
    setItems(initialArtworks)
  }, [initialArtworks])

  const filteredArtworks = useMemo(() => {
    const searched = searchArtworks(items, search)
    const nsfwFiltered = filterNsfwArtworks(searched, hideNsfw)
    return sortArtworks(nsfwFiltered, sort)
  }, [items, search, hideNsfw, sort])

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
      <div className="space-y-4">
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
                : "No artworks found."}
          </div>
        )}
      </div>

      <DeleteArtworkDialog
        artwork={artworkToDelete}
        open={!!artworkToDelete}
        onOpenChange={(open) => !open && setArtworkToDelete(null)}
        onDeleted={handleDeleted}
      />
    </>
  )
}
