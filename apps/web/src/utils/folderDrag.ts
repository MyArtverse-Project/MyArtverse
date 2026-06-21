export type FolderDragKind = "artwork" | "character"

export type FolderDragPayload = {
  kind: FolderDragKind
  id: string
}

export const FOLDER_DRAG_MIME = "application/x-mav-folder-item"

export function setFolderDragData(
  event: React.DragEvent,
  payload: FolderDragPayload
) {
  event.dataTransfer.setData(FOLDER_DRAG_MIME, JSON.stringify(payload))
  event.dataTransfer.effectAllowed = "move"
}

export function readFolderDragData(
  event: React.DragEvent
): FolderDragPayload | null {
  const raw = event.dataTransfer.getData(FOLDER_DRAG_MIME)
  if (!raw) return null

  try {
    const payload = JSON.parse(raw) as FolderDragPayload
    if (
      (payload.kind === "artwork" || payload.kind === "character") &&
      typeof payload.id === "string"
    ) {
      return payload
    }
  } catch {
    return null
  }

  return null
}

export function acceptsFolderDrag(
  payload: FolderDragPayload,
  acceptKinds?: FolderDragKind[]
) {
  if (!acceptKinds?.length) return true
  return acceptKinds.includes(payload.kind)
}
