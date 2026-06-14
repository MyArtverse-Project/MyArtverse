import { cn } from "@mav/shared/utils"
import type { IconType } from "react-icons"

interface EmptyStateProps {
  icon?: IconType
  title: string
  description?: string
  /** CTA slot (e.g. a Button) */
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className
}: EmptyStateProps) {
  return (
    <div
      data-mav-empty-state=""
      className={cn(
        "border-400 flex flex-col items-center gap-y-3 rounded-xl border border-dashed px-6 py-14 text-center",
        className
      )}
    >
      {Icon && (
        <span className="bg-200 text-500 grid h-14 w-14 place-items-center rounded-2xl">
          <Icon size={28} aria-hidden />
        </span>
      )}
      <div className="flex flex-col gap-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-subtext mx-auto max-w-sm text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
