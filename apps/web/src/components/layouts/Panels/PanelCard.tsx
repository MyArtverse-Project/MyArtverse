import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export function PanelCard({
  title,
  icon,
  actions,
  children,
  className,
  bodyClassName,
}: {
  title: string
  icon?: ReactNode
  actions?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <section
      className={cn(
        "flex h-full flex-col gap-4 rounded-2xl border border-primary/15 bg-primary/[0.07] p-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {icon ? (
            <span className="text-primary shrink-0 [&_svg]:size-5">{icon}</span>
          ) : null}
          <h2 className="truncate text-lg font-bold tracking-tight">{title}</h2>
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
      <div className={cn("flex min-h-0 flex-1 flex-col gap-4", bodyClassName)}>
        {children}
      </div>
    </section>
  )
}

export function PanelField({
  label,
  value,
  className,
}: {
  label: string
  value: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-muted-foreground text-[0.7rem] font-semibold uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}

export function PanelEmptyState({
  children,
  isOwner,
  ownerHint,
}: {
  children?: ReactNode
  isOwner?: boolean
  ownerHint: string
}) {
  return (
    <p className="text-muted-foreground rounded-xl border border-dashed border-primary/20 bg-background/60 px-4 py-8 text-center text-sm">
      {children ?? (isOwner ? ownerHint : "Nothing to display yet.")}
    </p>
  )
}
