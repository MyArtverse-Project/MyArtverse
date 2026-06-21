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
