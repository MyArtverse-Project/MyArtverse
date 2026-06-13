"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { IconType } from "react-icons"

export interface MastheadTabItem {
  text: string
  link: string
  icon?: IconType
  countIndicator?: number
}

interface MastheadTabsProps {
  baseURL?: string
  items: MastheadTabItem[]
}

export function MastheadTabs({ baseURL = "/", items }: MastheadTabsProps) {
  const pathname = usePathname()

  return (
    <div className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-[3.75rem] z-[3] mt-2.5 overflow-x-auto border-b backdrop-blur">
      <div className="mx-auto max-w-screen-2xl px-9">
        <nav className="flex items-center gap-x-1 py-1">
          {items.map(({ text, link, icon: Icon, countIndicator }, index) => {
            const href = `${baseURL}${link}`
            const isActive = pathname === href

            return (
              <Link
                key={index}
                prefetch
                href={href as never}
                aria-current={isActive ? "page" : undefined}
                aria-label={
                  countIndicator ? `${text}, ${countIndicator} items` : text
                }
                className={cn(
                  "relative flex items-center gap-x-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  "before:absolute before:inset-x-0 before:-bottom-1 before:block before:h-0.5 before:rounded-full",
                  isActive
                    ? "text-primary before:bg-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted before:bg-transparent"
                )}
              >
                {Icon && <Icon size={18} aria-hidden />}
                <span>{text}</span>
                {countIndicator != null && (
                  <Badge
                    variant={isActive ? "default" : "secondary"}
                    className="px-1.5 py-0"
                  >
                    {countIndicator}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
