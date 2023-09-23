"use client"

import { FolderViewProvider } from "./FolderViewProvider"

export default function FolderView({
  children
}: {
  children?: React.ReactNode
}) {
  return (
    <FolderViewProvider>
      <div id="folder-view-wrapper" className="flex gap-x-4">
        {children}
      </div>
    </FolderViewProvider>
  )
}
