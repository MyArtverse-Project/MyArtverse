async function uploadViaProxy(formData: FormData): Promise<string> {
  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    credentials: "include",
  })

  let payload: { url?: string; error?: string } = {}
  try {
    payload = await res.json()
  } catch {
    payload = {}
  }

  if (!res.ok) {
    throw new Error(payload.error ?? "Upload failed")
  }

  if (!payload.url) {
    throw new Error("Upload failed")
  }

  return payload.url
}

export async function uploadImageFile(file: File): Promise<string> {
  const ext = file.name.includes(".")
    ? file.name.slice(file.name.lastIndexOf("."))
    : ".png"
  const formData = new FormData()
  formData.append("file", file, `${crypto.randomUUID()}${ext}`)

  return uploadViaProxy(formData)
}

export async function uploadImageBlob(
  blob: Blob,
  filename = "upload.png"
): Promise<string> {
  const formData = new FormData()
  formData.append("file", blob, filename)

  return uploadViaProxy(formData)
}
