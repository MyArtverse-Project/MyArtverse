"use client"

import ArtworkGrid from "@/components/ArtworkGrid"
import type { Artwork } from "@/types/characters"
import { resolveArtworkGalleryHref } from "@/utils/galleryUtils"

export function SearchArtworkGrid({ artworks }: { artworks: Artwork[] }) {
  if (!artworks.length) return null

  return (
    <ArtworkGrid
      artworks={artworks}
      className="gap-3"
      tileClassName="rounded-xl"
      viewHref={(artwork) =>
        resolveArtworkGalleryHref(artwork, artwork.owner?.handle ?? "") ??
        `/@${artwork.owner?.handle ?? ""}`
      }
    />
  )
}
