import { ReferenceSheet } from '@/types/characters'
import NsfwMedia from '@/components/NsfwMedia'
import { cn } from '@mav/shared/utils'
import { getMainVariantImage, getMainVariantNsfw, refSheetListImageClassName } from "./Ref/refSheetUtils"

export default function RefSheetThumbnail({
  refSheet,
  onClick,
}: {
  refSheet: ReferenceSheet
  onClick?: () => void
}) {
  const image = getMainVariantImage(refSheet)
  const isNsfw = getMainVariantNsfw(refSheet)

  const content = (
    <>
      <div className={refSheetListImageClassName}>
        <NsfwMedia
          src={image}
          alt={refSheet.name}
          nsfw={isNsfw}
          fill
          editable={!!onClick}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 py-3 pr-4">
        <h3 className="text-lg font-semibold">{refSheet.name}</h3>
        <p className="text-muted-foreground text-sm">
          Contains {refSheet.variants.length} variant
          {refSheet.variants.length === 1 ? '' : 's'}
        </p>
      </div>
    </>
  )

  const className = cn(
    'border-border flex flex-row items-center gap-4 overflow-hidden rounded-lg border',
    refSheet.active ? 'bg-background' : 'bg-muted/40',
    onClick &&
      'hover:bg-muted/60 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cn(className, 'w-full text-left')}>
        {content}
      </button>
    )
  }

  return <div className={className}>{content}</div>
}
