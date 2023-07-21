"use client"

import type { IncludeReactNode, Theme } from "@/types"
import { createContext, useState } from "react"

export const NavbarContext = createContext<{
  isSidebarOpen: boolean
  setSidebarState: (sidebarState: boolean) => void
  theme: Theme
  setTheme: (theme: Theme) => void
}>({
  isSidebarOpen: false,
  setSidebarState: () => {},
  theme: "system",
  setTheme: () => {}
})

export function NavbarProvider({ children }: IncludeReactNode) {
  const [sidebarState, setSidebarState] = useState(false)
  const [theme, setTheme] = useState<Theme>("system")

  return (
    <NavbarContext.Provider
      value={{
        isSidebarOpen: sidebarState,
        setSidebarState,
        theme,
        setTheme
      }}
    >
      {children}
    </NavbarContext.Provider>
  )
}
