"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { BACKEND_URL } from "@/utils/constants"
import { cn } from "@mav/shared/utils"
import { LuUpload } from "react-icons/lu"
import type { MapElement } from "@/types/utils"

const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]
const maxFileSize = 10 * 1024 * 1024 // 10MB

export function DropZone({
  setData,
  className = "",
  value = "",
  onSuccess
}: {
  setData: (url: string) => void
  onSuccess?: () => void
  className?: string
  value?: string
  aspectRatio?: string
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(value || null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const fileUploadRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (fileUploadRef.current) fileUploadRef.current.value = ""
  }, [file])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(["dragenter", "dragover"].includes(e.type))
  }

  const handleDrop = (e: React.DragEvent<MapElement<"div">>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files.length) processFile(e.dataTransfer.files[0])
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) processFile(e.target.files[0])
  }

  const processFile = (uploadedFile: File) => {
    if (!allowedTypes.includes(uploadedFile.type)) {
      return setError("Invalid file type. Please upload a PNG or JPEG image.")
    }

    if (uploadedFile.size > maxFileSize) {
      return setError("File must not exceed 10MB!")
    }

    setError(null)
    setFile(uploadedFile)
    uploadFile(uploadedFile)
  }

  const uploadFile = async (uploadedFile: File) => {
    setUploading(true)
    setSuccess(false)

    const formData = new FormData()
    formData.append("file", uploadedFile)

    try {
      const res = await fetch(`${BACKEND_URL}/v1/profile/upload`, {
        method: "POST",
        body: formData,
        credentials: "include"
      })

      if (!res.ok) throw new Error("Upload failed. Please try again.")

      const data = await res.json()
      setData(data.url)
      setImageUrl(data.url)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    } finally {
      setUploading(false)
      // onSuccess()
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg text-center cursor-pointer z-10 bg-100 w-fit p-8",
        className
      )}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={() => fileUploadRef.current?.click()}
    >
      <input
        ref={fileUploadRef}
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
        accept={allowedTypes.join(", ")}
      />
      {imageUrl ? (
        <Image width={200} height={200} alt="Uploaded" src={imageUrl} className="rounded-md" />
      ) : uploading ? (
        <span className="text-lg font-bold">Uploading...</span>
      ) : (
        <div className="flex flex-col items-center justify-center text-sm cursor-pointer z-10 border-2 border-dashed aspect-square p-5 bg-100 rounded-lg">
          <span>Drag and drop files</span>
          <span>here or browse files</span>
          {error && <span className="text-red-500 mt-2">{error}</span>}
        </div>
      )}
    </div>
  )
}
