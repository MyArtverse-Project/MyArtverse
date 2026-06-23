import { ReferenceSheet } from "@/types/characters"

/** Landscape crop for list rows: fixed height, wider width. */
export const refSheetListImageClassName =
  "relative h-28 w-48 shrink-0 overflow-hidden sm:h-32 sm:w-56"

/** Variant editor preview: tall min-height, edge-to-edge crop. */
export const refSheetVariantPreviewClassName =
  "relative min-h-72 w-full flex-1 overflow-hidden rounded-md sm:min-h-80 lg:min-h-[22rem]"

type ApiVariant = ReferenceSheet["variants"][number] & {
  id?: string
  title?: string
  description?: string
  colors?: string[]
}

export function getMainVariantImage(refSheet: ReferenceSheet) {
  const variants = refSheet.variants as ApiVariant[]
  return (
    variants.find((v) => v.main)?.url ??
    variants[0]?.url ??
    "/DefaultReferenceSheet.png"
  )
}

export function getMainVariantNsfw(refSheet: ReferenceSheet) {
  const variants = refSheet.variants as ApiVariant[]
  const main = variants.find((v) => v.main) ?? variants[0]
  return !!main?.nsfw
}

export function mapVariantFromApi(variant: ApiVariant) {
  return {
    id: variant.id,
    title: variant.title ?? variant.name ?? "",
    description: variant.description ?? "",
    image: variant.url,
    primary: !!variant.main,
    nsfw: !!variant.nsfw,
    colors: variant.colors ?? [],
  }
}
