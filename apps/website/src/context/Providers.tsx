"use client"

import { SidebarProvider } from "./NavbarProvider"
import { ThemeProvider } from "./ThemeProvider"

export default function Providers({
  children
}: {
  children?: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  )
}
