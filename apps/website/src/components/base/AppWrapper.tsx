"use client"

import "swiper/css"
import { usePathname } from "next/navigation"
import { DashboardLayout, GlobalLayout } from "../layouts"
import SkipNav from "./SkipNav"

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const isRouteDashboard = usePathname().includes("dashboard")

  const DynamicLayout = !isRouteDashboard ? GlobalLayout : DashboardLayout

  return (
    <div id="myfursona-app">
      <SkipNav />
      {/* Platform announcements sent through the API goes here */}
      <div id="announcements"></div>
      <div className="contents" id="dynamic-layout-wrapper">
        <DynamicLayout>
          <div id="skip-nav" className="min-h-[calc(100dvh-3.75rem)]">
            {children}
          </div>
        </DynamicLayout>
      </div>
    </div>
  )
}
