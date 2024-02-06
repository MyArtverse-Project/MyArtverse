"use client"

import { ThemeProvider } from "./ThemeProvider"
import { DetailPeekProvider } from "./DetailPeekProvider"
import { SidebarProvider } from "./SidebarProvider"

export default function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DetailPeekProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </DetailPeekProvider>
    </ThemeProvider>
  )
}
