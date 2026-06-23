"use client"

import NsfwMedia from "@/components/NsfwMedia"
import ArtistCreditDisplay, {
  type ArtistCreditDisplayValue,
} from "@/components/ArtistCreditDisplay"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { LuDownload, LuExpand, LuStar } from "react-icons/lu"
import { PanelCard } from "./PanelCard"

export default function MediaPanel({
  title,
  imageUrl,
  imageAlt,
  nsfw = false,
  artistHandle,
  artistUrl,
  artistCredit,
  artistLabel,
  downloadUrl,
  isOwner,
  emptyHint,
}: {
  title: string
  imageUrl?: string
  imageAlt: string
  nsfw?: boolean
  artistHandle?: string
  artistUrl?: string
  artistCredit?: ArtistCreditDisplayValue | null
  artistLabel?: string
  downloadUrl?: string
  isOwner?: boolean
  emptyHint?: string
}) {
  const [expanded, setExpanded] = useState(false)
  const resolvedArtist: ArtistCreditDisplayValue | null =
    artistCredit ??
    (artistHandle
      ? {
          label: `@${artistHandle}`,
          href: `/@${artistHandle}`,
          isInternal: true,
          platform: "mav",
        }
      : artistUrl?.trim()
        ? {
            label: artistUrl.trim(),
            href: artistUrl.trim(),
            isInternal: false,
            platform: "url",
          }
        : null)

  if (!imageUrl) {
    return (
      <PanelCard title={title} icon={<LuStar />}>
        <p className="text-muted-foreground rounded-xl border border-dashed border-primary/20 bg-background/60 px-4 py-10 text-center text-sm">
          {isOwner
            ? (emptyHint ?? "Edit this panel to choose media.")
            : "No media to display yet."}
        </p>
      </PanelCard>
    )
  }

  return (
    <>
      <PanelCard title={title} icon={<LuStar />}>
        <div className="relative overflow-hidden rounded-xl bg-background/80">
          <div className="relative aspect-[4/3] w-full">
            <NsfwMedia
              src={imageUrl}
              alt={imageAlt}
              nsfw={nsfw}
              fill
              className="object-contain"
            />
          </div>
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="absolute right-3 top-3 size-9 bg-primary/90 text-primary-foreground shadow-md hover:bg-primary"
            aria-label="Expand image"
            onClick={() => setExpanded(true)}
          >
            <LuExpand className="size-4" />
          </Button>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-muted-foreground text-[0.7rem] font-semibold uppercase tracking-wide">
              {artistLabel ?? "Artist"}
            </p>
            {resolvedArtist ? (
              <ArtistCreditDisplay
                credit={resolvedArtist}
                linkClassName="text-primary text-sm font-semibold hover:underline"
              />
            ) : (
              <p className="text-muted-foreground text-sm">Unknown</p>
            )}
          </div>
          {downloadUrl ? (
            <Button
              size="icon"
              className="size-10 shrink-0"
              asChild
              aria-label="Download"
            >
              <a href={downloadUrl} download target="_blank" rel="noreferrer">
                <LuDownload className="size-4" />
              </a>
            </Button>
          ) : null}
        </div>
      </PanelCard>

      {expanded ? (
        <button
          type="button"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          aria-label="Close expanded image"
          onClick={() => setExpanded(false)}
        >
          <div className="relative max-h-full max-w-5xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={imageAlt}
              className="max-h-[90vh] max-w-full rounded-lg object-contain"
            />
          </div>
        </button>
      ) : null}
    </>
  )
}
