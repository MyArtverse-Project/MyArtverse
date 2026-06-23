import type { Folder } from "@/types/characters"

export function filterByFolder<T extends { folder?: { id: string } | null; folderId?: string | null }>(
  items: T[],
  selectedFolderId: string | null
) {
  if (!selectedFolderId) {
    return items
  }

  return items.filter((item) => {
    const folderId = item.folder?.id ?? item.folderId ?? null
    return folderId === selectedFolderId
  })
}

export function removeFolderFromTree(folders: Folder[], folderId: string): Folder[] {
  return folders
    .filter((folder) => folder.id !== folderId)
    .map((folder) => ({
      ...folder,
      children: folder.children
        ? removeFolderFromTree(folder.children, folderId)
        : [],
    }))
}

export function findFolderById(
  folders: Folder[],
  folderId: string
): Folder | null {
  for (const folder of folders) {
    if (folder.id === folderId) return folder
    if (folder.children) {
      const nested = findFolderById(folder.children, folderId)
      if (nested) return nested
    }
  }
  return null
}

export function collectDescendantIds(folder: Folder): string[] {
  return [
    folder.id,
    ...(folder.children?.flatMap((child) => collectDescendantIds(child)) ?? []),
  ]
}
