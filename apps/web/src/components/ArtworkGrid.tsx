"use client"

import GridResponsive from "@/components/layouts/Layouts/GridResponsive"
import NsfwMedia from "@/components/NsfwMedia"
import type { Artwork } from "@/types/characters"
import { cn } from "@/lib/utils"

export default function ArtworkGrid({
  artworks,
  className,
  tileClassName,
}: {
  artworks: Artwork[]
  className?: string
  tileClassName?: string
}) {
  const items = artworks.filter((artwork) => artwork.artworkUrl)

  if (items.length === 0) {
    return null
  }

  return (
    <GridResponsive breakpoint={250} className={cn("gap-4", className)} role="listbox">
      {items.map((artwork) => (
        <div
          key={artwork.id}
          className={cn(
            "border-border relative aspect-square overflow-hidden rounded-xl border",
            tileClassName
          )}
        >
          <NsfwMedia
            src={artwork.artworkUrl!}
            alt={artwork.altText ?? artwork.title ?? "Artwork"}
            nsfw={!!artwork.nsfw}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            containerClassName="rounded-xl"
          />
        </div>
      ))}
    </GridResponsive>
  )
}
