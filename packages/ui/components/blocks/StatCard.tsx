import { cn } from "@mav/shared/utils"
import type { IconType } from "react-icons"
import { Card } from "../primitives/Card"

interface StatCardProps {
  label: string
  value: string | number
  icon?: IconType
  /** e.g. "+12.5%" — colored by `trend` */
  delta?: string
  trend?: "up" | "down" | "neutral"
  hint?: string
  className?: string
}

const trendColors: Record<NonNullable<StatCardProps["trend"]>, string> = {
  up: "text-success",
  down: "text-alert",
  neutral: "text-subtext"
}

export function StatCard({
  label,
  value,
  icon: Icon,
  delta,
  trend = "neutral",
  hint,
  className
}: StatCardProps) {
  return (
    <Card data-mav-stat-card="" className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-x-3">
        <span className="text-subtext text-sm font-medium">{label}</span>
        {Icon && (
          <span className="bg-200 text-500 grid h-9 w-9 shrink-0 place-items-center rounded-lg">
            <Icon size={18} aria-hidden />
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-x-2">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        {delta && (
          <span className={cn("text-sm font-semibold", trendColors[trend])}>
            {delta}
          </span>
        )}
      </div>
      {hint && <p className="text-subtext mt-1 text-xs">{hint}</p>}
    </Card>
  )
}
