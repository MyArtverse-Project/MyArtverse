"use client"

import { usePathname } from "next/navigation"
import SkipNav from "./SkipNav"
import { DashboardLayout, GlobalLayout } from "../layouts"

export default function AppWrapper({
  children
}: {
  children: React.ReactNode
}) {
  const isRouteDashboard = usePathname().includes("dashboard")

  const DynamicLayout = !isRouteDashboard ? GlobalLayout : DashboardLayout

  return (
    <div id="myfursona-app">
      <SkipNav />
      {/* Platform announcements sent through the API goes here */}
      <div id="announcements"></div>
      <DynamicLayout>
        <div id="sn" className="min-h-[calc(100dvh-3.75rem)]">
          {children}
        </div>
      </DynamicLayout>
    </div>
  )
}
