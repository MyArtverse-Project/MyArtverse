import type { ReferenceSheet } from "@/types/characters"
import { resolveArtistCredit } from "@mav/shared"
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
  const artistCredit = refSheet ? resolveArtistCredit(refSheet) : null

  return (
    <MediaPanel
      title={title}
      imageUrl={mainVariant?.url}
      imageAlt={mainVariant?.name || refSheet?.name || "Reference sheet"}
      nsfw={!!mainVariant?.nsfw}
      artistCredit={artistCredit}
      downloadUrl={mainVariant?.url}
      isOwner={isOwner}
      emptyHint="Edit this panel to choose a reference sheet."
    />
  )
}
