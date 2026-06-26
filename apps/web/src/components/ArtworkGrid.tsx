"use client"

import Avatar from "@/components/Avatar"
import GridResponsive from "@/components/layouts/Layouts/GridResponsive"
import MoveArtworkMenu from "@/components/MoveArtworkMenu"
import NsfwMedia from "@/components/NsfwMedia"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Artwork, Folder } from "@/types/characters"
import { cn } from "@/lib/utils"
import {
  getArtworkCharacterMeta,
  isReferenceArtwork,
} from "@/utils/galleryUtils"
import { getVisibilityOwnerLabel, isRestrictedVisibility } from "@/utils/visibility"
import { setFolderDragData } from "@/utils/folderDrag"
import Link from "next/link"
import { LuLock, LuTrash2 } from "react-icons/lu"

export default function ArtworkGrid({
  artworks,
  className,
  tileClassName,
  editable = false,
  manageable = false,
  folders = [],
  onDelete,
  onMoved,
  viewHref,
  showMetadata = false,
  characterMeta,
}: {
  artworks: Artwork[]
  className?: string
  tileClassName?: string
  editable?: boolean
  manageable?: boolean
  folders?: Folder[]
  onDelete?: (artwork: Artwork) => void
  onMoved?: (artworkId: string, folderId: string | null) => void
  viewHref?: (artwork: Artwork) => string
  showMetadata?: boolean
  characterMeta?: { name: string; avatarUrl?: string }
}) {
  const items = artworks.filter((artwork) => artwork.artworkUrl)

  if (items.length === 0) {
    return null
  }

  const renderMetadata = (artwork: Artwork) => {
    if (!showMetadata) return null

    const meta = getArtworkCharacterMeta(artwork, characterMeta)
    if (!meta) return null

    return (
      <div className="flex items-center gap-2 pt-0.5">
        <Avatar
          size={24}
          src={meta.avatarUrl}
          username={meta.name}
          imageKey={artwork.id}
        />
        <span className="min-w-0 flex-1 truncate text-sm font-semibold">
          {meta.name}
        </span>
        {isReferenceArtwork(artwork) ? (
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/5 text-primary shrink-0 rounded-full px-2 py-0 text-[11px] font-medium"
          >
            Reference
          </Badge>
        ) : null}
        {editable && isRestrictedVisibility(artwork.visibility) ? (
          <LuLock
            size={14}
            className="text-primary shrink-0"
            aria-label={getVisibilityOwnerLabel(artwork.visibility).label}
          />
        ) : null}
      </div>
    )
  }

  const renderTile = (
    artwork: Artwork,
    media: React.ReactNode,
    options?: {
      href?: string
      wrapperClassName?: string
      draggable?: boolean
      onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void
      imageOverlay?: React.ReactNode
      linkDraggable?: boolean
    }
  ) => {
    const imageTileClass = cn(
      "relative aspect-square w-full overflow-hidden rounded-2xl",
      showMetadata ? "" : "h-full",
      !showMetadata &&
        (editable || manageable) &&
        "hover:ring-primary/40 focus-visible:ring-primary transition-shadow hover:ring-2 focus-visible:ring-2 focus-visible:outline-none",
      !showMetadata && tileClassName
    )

    const imageBlock = (
      <div className={imageTileClass}>
        {media}
        {options?.imageOverlay}
      </div>
    )

    const content = (
      <>
        {imageBlock}
        {renderMetadata(artwork)}
      </>
    )

    const wrapperClass = cn(
      showMetadata ? "group flex flex-col gap-2" : "group relative h-full",
      options?.wrapperClassName
    )

    if (options?.href) {
      return (
        <div
          className={wrapperClass}
          draggable={options.draggable}
          onDragStart={options.onDragStart}
        >
          <Link
            href={options.href}
            className={cn(
              "block w-full",
              showMetadata ? "flex flex-col gap-2" : "h-full"
            )}
            aria-label={`View ${artwork.title ?? "artwork"}`}
            draggable={options.linkDraggable ?? false}
          >
            {content}
          </Link>
        </div>
      )
    }

    return (
      <div
        className={wrapperClass}
        draggable={options?.draggable}
        onDragStart={options?.onDragStart}
      >
        {content}
      </div>
    )
  }

  const renderMedia = (artwork: Artwork) => (
    <NsfwMedia
      src={artwork.artworkUrl!}
      alt={artwork.altText ?? artwork.title ?? "Artwork"}
      nsfw={!!artwork.nsfw}
      fill
      editable={editable || manageable}
      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      containerClassName="rounded-2xl"
    />
  )

  return (
    <GridResponsive
      breakpoint={showMetadata ? 220 : 250}
      className={cn("gap-4", className)}
      role="listbox"
    >
      {items.map((artwork) => {
        if (editable) {
          return (
            <div key={artwork.id} className="relative">
              {renderTile(artwork, renderMedia(artwork), {
                href: `/studio/gallery/${artwork.id}/edit`,
                imageOverlay: (
                  <>
                    {isRestrictedVisibility(artwork.visibility) ? (
                      <span className="bg-background/90 text-primary absolute left-2 top-2 z-10 inline-flex size-8 items-center justify-center rounded-full shadow-sm">
                        <LuLock
                          size={14}
                          aria-label={
                            getVisibilityOwnerLabel(artwork.visibility).label
                          }
                        />
                      </span>
                    ) : null}
                    {onDelete ? (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2 z-10 size-8 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                        aria-label={`Delete ${artwork.title ?? "artwork"}`}
                        onClick={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                          onDelete(artwork)
                        }}
                      >
                        <LuTrash2 size={16} />
                      </Button>
                    ) : null}
                  </>
                ),
              })}
            </div>
          )
        }

        if (manageable) {
          const href = viewHref?.(artwork)

          return (
            <div key={artwork.id} className="relative">
              {renderTile(artwork, renderMedia(artwork), {
                href,
                wrapperClassName: "cursor-grab active:cursor-grabbing",
                draggable: true,
                onDragStart: (event) => {
                  setFolderDragData(event, { kind: "artwork", id: artwork.id })
                },
                linkDraggable: false,
              })}
              <MoveArtworkMenu
                artwork={artwork}
                folders={folders}
                onMoved={onMoved}
              />
            </div>
          )
        }

        return (
          <div key={artwork.id}>
            {renderTile(artwork, renderMedia(artwork), {
              href: viewHref?.(artwork),
            })}
          </div>
        )
      })}
    </GridResponsive>
  )
}
