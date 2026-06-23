import type { ReferenceSheet } from "@/types/characters"
import MediaPanel from "./MediaPanel"

export default function ReferenceSheetPanel({
  refSheet,
  title = "Reference sheet",
  isOwner,
}: {
  refSheet: ReferenceSheet | null
  title?: string
  isOwner?: boolean
}) {
  const mainVariant =
    refSheet?.variants.find((variant) => variant.main) ?? refSheet?.variants[0]

  return (
    <MediaPanel
      title={title}
      imageUrl={mainVariant?.url}
      imageAlt={mainVariant?.name || refSheet?.name || "Reference sheet"}
      nsfw={!!mainVariant?.nsfw}
      artistLabel="Artist"
      artistHandle={
        refSheet?.artist?.startsWith("@")
          ? refSheet.artist.slice(1)
          : refSheet?.artist || undefined
      }
      downloadUrl={mainVariant?.url}
      isOwner={isOwner}
      emptyHint="Edit this panel to choose a reference sheet."
    />
  )
}
