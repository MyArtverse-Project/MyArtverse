"use client"

import { FolderViewProvider } from "./FolderViewProvider"

export default function FolderView({ children }: { children?: React.ReactNode }) {
  return (
    <FolderViewProvider>
      <div className="flex gap-x-4">{children}</div>
    </FolderViewProvider>
  )
}
