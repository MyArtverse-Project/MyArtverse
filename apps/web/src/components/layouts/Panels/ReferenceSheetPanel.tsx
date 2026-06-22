import NsfwMedia from "@/components/NsfwMedia"
import type { ReferenceSheet } from "@/types/characters"
import { Group } from "@/components/ui/group"

export default function ReferenceSheetPanel({
  refSheet,
  isOwner,
}: {
  refSheet: ReferenceSheet | null
  isOwner?: boolean
}) {
  const mainVariant =
    refSheet?.variants.find((variant) => variant.main) ?? refSheet?.variants[0]

  return (
    <Group title="Reference sheet" containerStyle="border-padding">
      {refSheet && mainVariant?.url ? (
        <div className="space-y-3">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <NsfwMedia
              src={mainVariant.url}
              alt={mainVariant.name || refSheet.name}
              nsfw={!!mainVariant.nsfw}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <p className="font-medium">{refSheet.name}</p>
            {refSheet.artist ? (
              <p className="text-muted-foreground text-sm">{refSheet.artist}</p>
            ) : null}
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          {isOwner
            ? "No reference sheet selected. Edit this panel to choose one."
            : "No reference sheet to display yet."}
        </p>
      )}
    </Group>
  )
}
