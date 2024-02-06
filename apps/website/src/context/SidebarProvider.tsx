"use client"

import { createContext, useContext, useState } from "react"

const SidebarContext = createContext<{
  sidebarState: boolean
  setSidebarState: React.Dispatch<React.SetStateAction<boolean>>
}>({
  sidebarState: false,
  setSidebarState: () => {}
})

export function useSidebarContext() {
  const ctx = useContext(SidebarContext)

  if (!ctx) {
    throw new Error("The useSidebarContext hook must be used within the SidebarContext.")
  }

  return ctx
}

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
