"use client"

import { useSelectedLayoutSegments } from "next/navigation"

export default function DashboardSidebar() {
  const segments = useSelectedLayoutSegments()

  return (
    <nav
      style={{ width: 250 }}
      className="border-r-separator sticky top-16 h-[calc(100dvh-4rem)] border-r [align-self:flex-start]"
    >
      sidebar items
      {segments.map((segment, index) => (
        <li key={index}>{segment}</li>
      ))}
    </nav>
  )
}
