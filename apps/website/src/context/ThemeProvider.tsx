"use client"

import { Theme } from "@/types"
import React, { createContext, useContext, useEffect, useState } from "react"

export const ThemeContext = createContext<{
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}>({
  theme: "system",
  setTheme: () => {}
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")

  useEffect(() => {
    const lsThemeKey = "theme-mode"

    if (!localStorage.getItem(lsThemeKey)) {
      localStorage.setItem(lsThemeKey, "system")
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext)

  if (!ctx) {
    throw new Error(
      "The useThemeContext hook must be used within the ThemeProvider."
    )
  }

  return ctx
}
