import { uploadImageAction } from "@/app/actions/uploadImage"

export async function uploadImageFile(file: File): Promise<string> {
  const ext = file.name.includes(".")
    ? file.name.slice(file.name.lastIndexOf("."))
    : ".png"
  const formData = new FormData()
  formData.append("file", file, `${crypto.randomUUID()}${ext}`)

  return uploadImageAction(formData)
}

export async function uploadImageBlob(
  blob: Blob,
  filename = "upload.png"
): Promise<string> {
  const formData = new FormData()
  formData.append("file", blob, filename)

  return uploadImageAction(formData)
}
