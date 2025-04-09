"use client"

import { createContext, useContext, useState } from "react"

const FolderViewContext = createContext<{
  folderWidth: number
  setFolderWidth: React.Dispatch<React.SetStateAction<number>>
} | null>(null)

export function useFolderViewContext() {
  const ctx = useContext(FolderViewContext)

  if (!ctx) {
    throw new Error(
      "The useFolderViewContext must be used within the FolderViewProvider"
    )
  }

  return ctx
}

export function FolderView({
  children
}: {
  children?: React.ReactNode
}) {
  const [folderWidth, setFolderWidth] = useState(275)

  return (
    <FolderViewContext.Provider
      value={{
        folderWidth,
        setFolderWidth
      }}
    >
      <div className="flex gap-x-4">{children}</div>
    </FolderViewContext.Provider>
  )
}
