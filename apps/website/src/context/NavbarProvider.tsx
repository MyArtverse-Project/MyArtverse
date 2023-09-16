"use client"

import { createContext, useState } from "react"

export const SidebarContext = createContext<{
  sidebarState: boolean
  setSidebarState: React.Dispatch<React.SetStateAction<boolean>>
}>({
  sidebarState: false,
  setSidebarState: () => {}
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [sidebarState, setSidebarState] = useState(false)

  return (
    <SidebarContext.Provider
      value={{
        sidebarState,
        setSidebarState
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
