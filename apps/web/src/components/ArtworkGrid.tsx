"use client"

import GridResponsive from "@/components/layouts/Layouts/GridResponsive"
import NsfwMedia from "@/components/NsfwMedia"
import { Button } from "@/components/ui/button"
import type { Artwork } from "@/types/characters"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { LuTrash2 } from "react-icons/lu"

export default function ArtworkGrid({
  artworks,
  className,
  tileClassName,
  editable = false,
  onDelete,
}: {
  artworks: Artwork[]
  className?: string
  tileClassName?: string
  editable?: boolean
  onDelete?: (artwork: Artwork) => void
}) {
  const items = artworks.filter((artwork) => artwork.artworkUrl)

  if (items.length === 0) {
    return null
  }

  return (
    <GridResponsive breakpoint={250} className={cn("gap-4", className)} role="listbox">
      {items.map((artwork) => {
        const tileClass = cn(
          "border-border relative aspect-square overflow-hidden rounded-xl border",
          editable &&
            "hover:ring-primary/40 focus-visible:ring-primary transition-shadow hover:ring-2 focus-visible:ring-2 focus-visible:outline-none",
          tileClassName
        )

        const media = (
          <NsfwMedia
            src={artwork.artworkUrl!}
            alt={artwork.altText ?? artwork.title ?? "Artwork"}
            nsfw={!!artwork.nsfw}
            fill
            editable={editable}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            containerClassName="rounded-xl"
          />
        )

        if (editable) {
          return (
            <div key={artwork.id} className={cn(tileClass, "group")}>
              <Link
                href={`/studio/gallery/${artwork.id}/edit`}
                className="block h-full w-full"
                aria-label={`Edit ${artwork.title ?? "artwork"}`}
              >
                {media}
              </Link>
              {onDelete ? (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 z-10 size-8 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                  aria-label={`Delete ${artwork.title ?? "artwork"}`}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onDelete(artwork)
                  }}
                >
                  <LuTrash2 size={16} />
                </Button>
              ) : null}
            </div>
          )
        }

        return (
          <div key={artwork.id} className={tileClass}>
            {media}
          </div>
        )
      })}
    </GridResponsive>
  )
}
