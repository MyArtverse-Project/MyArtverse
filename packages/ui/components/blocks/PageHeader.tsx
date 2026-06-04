import { cn } from "@mav/shared/utils"
import type { IconType } from "react-icons"

interface PageHeaderProps {
  /** Small uppercase label above the title */
  eyebrow?: string
  title: string
  description?: string | React.ReactNode
  icon?: IconType
  /** Right-aligned action slot (buttons, menus, etc.) */
  actions?: React.ReactNode
  /** Optional node rendered above the header (e.g. breadcrumbs) */
  before?: React.ReactNode
  bordered?: boolean
  className?: string
}

export function PageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  actions,
  before,
  bordered = true,
  className
}: PageHeaderProps) {
  return (
    <header
      data-mav-page-header=""
      className={cn(
        "flex flex-col gap-y-4 pb-5",
        bordered && "border-400 border-b",
        className
      )}
    >
      {before}
      <div className="flex flex-col gap-x-6 gap-y-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-x-4">
          {Icon && (
            <span className="bg-300 text-500 grid h-12 w-12 shrink-0 place-items-center rounded-xl">
              <Icon size={24} aria-hidden />
            </span>
          )}
          <div className="flex flex-col gap-y-1">
            {eyebrow && (
              <span className="text-500 text-xs font-semibold uppercase tracking-wider">
                {eyebrow}
              </span>
            )}
            <h1 className="text-3xl font-bold leading-tight tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-subtext max-w-2xl text-sm leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-x-2 empty:hidden">
            {actions}
          </div>
        )}
      </div>
    </header>
  )
}
