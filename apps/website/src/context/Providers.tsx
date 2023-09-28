"use client"

import dynamic from "next/dynamic"
import { ThemeProvider } from "./ThemeProvider"
import { DetailPeekProvider } from "./DetailPeekProvider"
import { SidebarProvider } from "./SidebarProvider"
import { UserAgentProvider } from "@quentin-sommer/react-useragent"

export default function Providers({
  children
}: {
  children?: React.ReactNode
}) {
  return (
    <UserAgentProvider ua={window.navigator.userAgent}>
      <ThemeProvider>
        <DetailPeekProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </DetailPeekProvider>
      </ThemeProvider>
    </UserAgentProvider>
  )
}
