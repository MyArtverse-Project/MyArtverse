import { Button } from '@mav/ui/components/buttons'
import React from 'react'
import clsx from "clsx"

export default function SidebarItem({ icon, label, href, isSidebarExpanded }: {
  icon: React.ReactNode
  label: string
  href: string
  isSidebarExpanded: boolean
}) {
  return (
    <Button
      href={href}
      variant="tritery"
      prefix={
        <div
          className={clsx(
            "flex items-center justify-center",
            isSidebarExpanded ? "min-w-[20px]" : "w-full"
          )}
        >
          {icon}
        </div>
      }
      className={clsx(
        "flex items-center",
        isSidebarExpanded ? "justify-start" : "justify-center px-0"
      )}
    >
      {isSidebarExpanded && <span>{label}</span>}
    </Button>
  )
}

