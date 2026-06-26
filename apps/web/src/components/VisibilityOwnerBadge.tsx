import { Badge } from "@/components/ui/badge"
import type { Visibility } from "@/types/utils"
import { getVisibilityOwnerLabel } from "@/utils/visibility"

export default function VisibilityOwnerBadge({
  visibility,
  className,
}: {
  visibility: Visibility | string | undefined
  className?: string
}) {
  const { label, icon: Icon } = getVisibilityOwnerLabel(visibility)

  if (visibility === "public" || !visibility) {
    return null
  }

  return (
    <Badge
      variant="outline"
      className={
        className ??
        "border-primary/30 bg-primary/5 text-primary gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
      }
    >
      <Icon size={12} aria-hidden />
      {label}
    </Badge>
  )
}
