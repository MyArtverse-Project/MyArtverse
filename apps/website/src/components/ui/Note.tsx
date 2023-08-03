import type {
  IncludeReactNode,
  PickUnion,
  VariantLiterals as NoteVariants,
  PartialRecord
} from "@/types"
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  LucideIcon,
  XCircleIcon
} from "lucide-react"

// prettier-ignore
type NoteStatus = PickUnion<NoteVariants, "success" | "warning" | "error" | "info">

export default function Notice({
  children,
  type,
  heading
}: IncludeReactNode<{
  type: NoteStatus
  heading?: string
}>) {
  const status: PartialRecord<NoteStatus, { css: string; icon: LucideIcon }> = {
    warning: {
      icon: AlertTriangleIcon,
      css: "bg-warning-bg selection:bg-warning selection:text-background"
    },
    error: {
      icon: XCircleIcon,
      css: "bg-error-bg selection:bg-error selection:text-background"
    },
    success: {
      icon: CheckCircle2Icon,
      css: "bg-info-bg selection:bg-info selection:text-background"
    }
  }

  const statusStyles = status[type]?.css
  const StatusIcon = status[type]?.icon as LucideIcon

  return (
    <div
      data-note=""
      className={` flex gap-1.5 px-3.5 py-3 border rounded-md ${statusStyles}`}
    >
      <StatusIcon size={25} />
      <div data-note-contents="">
        {heading && (
          <h2 className="text-lg font-bold -translate-y-0.5">{heading}</h2>
        )}
        {children}
      </div>
    </div>
  )
}
