"use client"

import FolderView from "@/components/layouts/Folders"
import type { Folder } from "@/types/characters"
import type { FolderDragKind, FolderDragPayload } from "@/utils/folderDrag"

export function renderFolderTree({
  folders,
  selectedFolderId,
  onSelectFolder,
  owner,
  onCreateNested,
  onDeleteFolder,
  acceptKinds,
  onDropItem,
}: {
  folders: Folder[]
  selectedFolderId: string | null
  onSelectFolder: (folderId: string | null) => void
  owner: boolean
  onCreateNested: (parentId: string) => void
  onDeleteFolder?: (folderId: string) => void
  acceptKinds?: FolderDragKind[]
  onDropItem?: (folderId: string | null, payload: FolderDragPayload) => void
}) {
  return folders.map((folder) => (
    <FolderView.Item
      key={folder.id}
      folderId={folder.id}
      name={folder.name}
      color={folder.color}
      selected={selectedFolderId === folder.id}
      onSelect={() => onSelectFolder(folder.id)}
      onDelete={owner ? onDeleteFolder : undefined}
      acceptKinds={acceptKinds}
      onDropItem={onDropItem}
    >
      {folder.children?.map((child) => (
        <FolderView.Item
          key={child.id}
          folderId={child.id}
          name={child.name}
          color={child.color}
          nestedItem
          selected={selectedFolderId === child.id}
          onSelect={() => onSelectFolder(child.id)}
          onDelete={owner ? onDeleteFolder : undefined}
          acceptKinds={acceptKinds}
          onDropItem={onDropItem}
        />
      ))}
      {owner ? (
        <FolderView.Item
          newItem
          nestedItem
          onClick={() => onCreateNested(folder.id)}
        />
      ) : null}
    </FolderView.Item>
  ))
}
