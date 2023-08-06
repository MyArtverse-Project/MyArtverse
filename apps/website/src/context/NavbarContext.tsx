"use client"

import Portal from "@/components/ui/Portal"
import type { IncludeReactNode, Theme } from "@/types"
import { createContext, useEffect, useState } from "react"

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

  useEffect(() => {
    const htmlRoot = document.documentElement
    const lsThemeKey = "theme-mode"

    if (!localStorage.getItem(lsThemeKey)) {
      localStorage.setItem(lsThemeKey, "system")
    }
  }, [theme])

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
