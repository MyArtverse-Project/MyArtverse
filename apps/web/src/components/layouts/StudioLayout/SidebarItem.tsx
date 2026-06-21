import { Button } from "@/components/ui/button"
import clsx from "clsx"
import Link from "next/link"
import type { ReactNode } from "react"

export default function SidebarItem({
  icon,
  label,
  href,
  isSidebarExpanded
}: {
  icon: ReactNode
  label: string
  href: string
  isSidebarExpanded: boolean
}) {
  return (
    <Button
      variant="ghost"
      asChild
      className={clsx(
        "flex w-full items-center",
        isSidebarExpanded ? "justify-start" : "justify-center px-0"
      )}
    >
      <Link href={href}>
        <div
          className={clsx(
            "flex items-center justify-center",
            isSidebarExpanded ? "min-w-[20px]" : "w-full"
          )}
        >
          {icon}
        </div>
        {isSidebarExpanded && <span>{label}</span>}
      </Link>
    </Button>
  )
}
