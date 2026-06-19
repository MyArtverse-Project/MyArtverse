"use client"

import ArtworkGrid from "@/components/ArtworkGrid"
import DeleteArtworkDialog from "@/components/DeleteArtworkDialog"
import type { Artwork } from "@/types/characters"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function StudioGallery({ artworks }: { artworks: Artwork[] }) {
  const router = useRouter()
  const [items, setItems] = useState(artworks)
  const [artworkToDelete, setArtworkToDelete] = useState<Artwork | null>(null)

  const handleDeleted = () => {
    if (!artworkToDelete) return
    setItems((current) => current.filter((item) => item.id !== artworkToDelete.id))
    setArtworkToDelete(null)
    router.refresh()
  }

  if (items.length === 0) {
    return (
      <div className="text-muted-foreground text-sm">No artworks found.</div>
    )
  }

  return (
    <>
      <ArtworkGrid
        artworks={items}
        editable
        onDelete={(artwork) => setArtworkToDelete(artwork)}
      />
      <DeleteArtworkDialog
        artwork={artworkToDelete}
        open={!!artworkToDelete}
        onOpenChange={(open) => !open && setArtworkToDelete(null)}
        onDeleted={handleDeleted}
      />
    </>
  )
}
