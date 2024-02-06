"use client"

import { createContext, useContext, useState } from "react"

const FolderViewContext = createContext<{
  folderWidth: number
  setFolderWidth: React.Dispatch<React.SetStateAction<number>>
}>({
  folderWidth: 270,
  setFolderWidth: () => {}
})

export function useFolderViewContext() {
  const ctx = useContext(FolderViewContext)

  if (!ctx) {
    throw new Error(
      "The useFolderViewContext must be used within the FolderViewProvider, you dumbass"
    )
  }

  return ctx
}

export function FolderViewProvider({ children }: { children?: React.ReactNode }) {
  const [folderWidth, setFolderWidth] = useState(275)

  return (
    <FolderViewContext.Provider
      value={{
        folderWidth,
        setFolderWidth
      }}
    >
      {children}
    </FolderViewContext.Provider>
  )
}
