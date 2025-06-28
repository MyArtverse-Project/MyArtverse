"use client"

import type { MapElement } from "@/types/utils"
import { BACKEND_URL } from "@/utils/constants"
import { cn } from "@mav/shared/utils"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { LuUpload } from "react-icons/lu"

const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]
const maxFileSize = 10 * 1024 * 1024 // 10 MB

export default function DropZone({
  setData,
  className = "",
  value = null,
  aspectRatio = "1"
}: {
  setData: (url: string) => void
  className?: string
  value?: string | null
  aspectRatio?: string
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(value)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [_success, setSuccess] = useState(false)

  const fileUploadRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (fileUploadRef.current) fileUploadRef.current.value = ""
  }, [file])

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => e.preventDefault()
    window.addEventListener("dragover", handleDragOver)
    return () => window.removeEventListener("dragover", handleDragOver)
  }, [])

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
      return setError("Invalid file type.")
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

      if (!res.ok)
        throw new Error(
          res.status === 401 ? "Are you logged in?" : "Upload failed"
        )

      const data = await res.json()
      setData(data.url)
      setImageUrl(data.url)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div
      className={cn(
        "rounded-md border-2 border-dashed p-10 text-center transition-colors",
        isDragging ? "bg-300" : "bg-100",
        className
      )}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileUploadRef}
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
      />
      {imageUrl ? (
        <div className="flex flex-col items-center">
          <Image width={200} height={200} alt="Uploaded" src={imageUrl} />
          {/* <span className="text-lg font-bold">Uploaded!</span> */}
        </div>
      ) : uploading ? (
        <span className="text-lg font-bold">Uploading...</span>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="mb-6 flex items-center justify-center rounded-full bg-200 p-8"
            onClick={() => fileUploadRef.current?.click()}
          >
            <LuUpload size={48} />
          </button>
          <span className="text-lg font-bold">Drag and drop files here</span>
          <span className="mt-4">
            Max size: 10MB, Supported formats: .jpg, .png
          </span>
          {error && <span className="text-red-500">{error}</span>}
        </div>
      )}
    </div>
  )
}
