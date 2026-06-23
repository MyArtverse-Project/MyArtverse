"use client"

import { MyArtverseIcon } from "@/components/icons/MyArtverse"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { LuSparkles } from "react-icons/lu"

export default function ChangelogNotificationItem({
  title,
  onNavigate,
  className,
}: {
  title?: string | null
  onNavigate?: () => void
  className?: string
}) {
  return (
    <Link
      href="/changelog"
      onClick={onNavigate}
      className={cn(
        "hover:bg-muted/60 flex w-full items-start gap-4 rounded-lg px-2 py-3 transition-colors",
        className
      )}
    >
      <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-full">
        <MyArtverseIcon logoOnly size={0.55} />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <p className="flex items-center gap-1.5 font-semibold">
          <LuSparkles size={16} className="text-primary shrink-0" />
          New updates!
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {title
            ? `See what's new in ${title}.`
            : "Check out the latest changes on MyArtverse."}
        </p>
      </div>
    </Link>
  )
}
