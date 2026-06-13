"use client"

import { cn } from "@mav/shared/utils"
import { Button } from "@/components/ui/button"
import { kebabCase } from "lodash"
import Link from "next/link"
import { usePathname } from "next/navigation"
import settingRoutes from "./SidebarSettingsList.constants"

export function SidebarSettingsList() {
  const currentPath = usePathname()

  return (
    <nav
      aria-label="User settings"
      className="min-h-[calc(100dvh-4.5rem)] w-52 flex-shrink-0 xl:w-64"
    >
      <ul className="flex flex-col gap-y-2">
        {settingRoutes.map((section, i) => {
          const ariaHeading = `${section.heading?.toLowerCase()}-heading`

          return (
            <li key={section.heading}>
              <div
                id={ariaHeading}
                className={cn(
                  "mx-3.5 text-xs font-semibold uppercase opacity-75",
                  i > 0
                    ? "before:border-border relative mb-2.5 mt-4 before:absolute before:-inset-x-2 before:-translate-y-3.5 before:border-t-[1px]"
                    : "my-2.5"
                )}
              >
                {section.heading}
              </div>
              <ul
                className="flex flex-col gap-y-0.5"
                aria-labelledby={ariaHeading}
              >
                {section.items.map((item, i) => {
                  const itemPath = `/settings/${item.slug || kebabCase(item.label)}`
                  const isCurrentPath = currentPath === itemPath

                  return (
                    <li key={i}>
                      <Button
                        asChild
                        variant="ghost"
                        aria-current={isCurrentPath ? "page" : undefined}
                        className={cn(
                          "w-full justify-start gap-x-2.5",
                          isCurrentPath &&
                            "bg-accent text-accent-foreground font-medium"
                        )}
                      >
                        <Link href={itemPath}>
                          <item.icon size={20} />
                          {item.label}
                        </Link>
                      </Button>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
