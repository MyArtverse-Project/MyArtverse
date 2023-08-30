"use client"

import { SessionProvider } from "next-auth/react"
import { SidebarProvider } from "./NavbarProvider"
import { ThemeProvider } from "./ThemeProvider"

export default function Providers({
  children
}: {
  children?: React.ReactNode
}) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
