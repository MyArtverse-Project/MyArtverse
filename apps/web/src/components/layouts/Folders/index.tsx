"use client"

import FolderItem from "./FolderItem"
import FolderShelf from "./FolderShelf"
import FolderView from "./FolderView"

const FolderContents = ({
  children
}: {
  children: React.ReactNode
}) => <div className="w-full">{children}</div>

export default Object.assign(FolderView, {
  Item: FolderItem,
  Shelf: FolderShelf,
  Contents: FolderContents
})
