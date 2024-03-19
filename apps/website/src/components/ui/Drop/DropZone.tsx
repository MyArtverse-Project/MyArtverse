"use client"

import { useEffect, useState } from "react"
import cn from "@/utils/cn"
import { BACKEND_URL } from "@/utils/env"
import { LuUpload } from "react-icons/lu"

const allowedTypes = ["image/png", "image/jpeg", "image/jpg"] as const
const maxFileSize = 10 * 1024 * 1024 // 10 MB

export default function DropZone({ setData }) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault()
    }

    document.addEventListener("dragover", handleDragOver)

    return () => {
      document.removeEventListener("dragover", handleDragOver)
    }
  }, [])

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(e.type === "dragenter" || e.type === "dragover")
  }

  const handleImageDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const uploadedFile = e.dataTransfer.files[0]
    handleFile(uploadedFile)
  }

  const handleFileInputChange = (e) => {
    const uploadedFile = e.target.files[0]
    handleFile(uploadedFile)
  }

  const handleFile = (uploadedFile) => {
    if (!uploadedFile) return
    if (!allowedTypes.includes(uploadedFile.type) || uploadedFile.size > maxFileSize) {
      setError("Invalid file type or size. Max size: 10MB, Supported: PNG, JPG")
      setFile(null)
      setImageUrl(null)
      return
    }

    setError("")
    setUploading(true)
    setFile(uploadedFile)

    const formData = new FormData()
    formData.append("file", uploadedFile)
    setUploading(true)

    fetch(`${BACKEND_URL}/v1/profile/upload`, {
      method: "POST",
      body: formData,
      credentials: "include"
    }).then((res) => {
      if (!res.ok) throw new Error("Failed to upload image")
      res
        .json()
        .then((data) => {
          setData(data.url)
          setImageUrl(data.url)
        })
        .catch((err) => {
          setError(err.message)
        })
    })
  }

  return (
    <div
      className={cn(
        isDragging ? "bg-400" : "bg-300",
        "border-600 rounded-md border-4 border-dashed p-10 text-center"
      )}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleImageDrop}
    >
      {file ? (
        <div className="flex flex-col items-center justify-center">
          <input type="file" className="hidden" onChange={handleFileInputChange} />
          {/* eslint-disable-next-line */}
          <img alt="" src={imageUrl} width={200} height={200} />
          <h4 className="text-sm">Uploaded!</h4>
        </div>
      ) : uploading ? (
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-sm">Uploading...</h4>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <input type="file" className="hidden" onChange={handleFileInputChange} />
          <span className="bg-100 mb-6 flex items-center justify-center rounded-full p-6">
            <LuUpload size={64} />
          </span>
          <h4 className="text-sm">Drag Files Here</h4>
          <p className="mt-4 text-xl">Max size: 10MB, Supported: PNG, JPG</p>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </div>
  )
}
