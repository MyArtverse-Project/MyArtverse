import { BACKEND_URL } from "@/utils/constants"

export async function uploadImageFile(file: File): Promise<string> {
  const ext = file.name.includes(".")
    ? file.name.slice(file.name.lastIndexOf("."))
    : ".png"
  const formData = new FormData()
  formData.append("file", file, `${crypto.randomUUID()}${ext}`)

  const resp = await fetch(`${BACKEND_URL}/v1/profile/upload`, {
    method: "POST",
    body: formData,
    credentials: "include",
  })

  if (!resp.ok) {
    throw new Error(resp.status === 401 ? "Are you logged in?" : "Upload failed")
  }

  const data = await resp.json()
  return data.url as string
}
