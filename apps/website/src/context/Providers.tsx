"use client"

import { DetailPeekProvider } from "./DetailPeekProvider"
import { SidebarProvider } from "./SidebarProvider"
import { ThemeProvider } from "./ThemeProvider"

export default function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DetailPeekProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </DetailPeekProvider>
    </ThemeProvider>
  )
}
