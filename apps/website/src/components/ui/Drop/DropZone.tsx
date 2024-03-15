"use client"

import { useEffect, useState } from "react"
import { LuUpload as UploadIcon } from "react-icons/lu"

const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]
const maxFileSize = 25 * 1024 * 1024 // 25 MB

export default function DropZone() {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

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

    if (allowedTypes.includes(uploadedFile.type) && uploadedFile.size <= maxFileSize) {
      setFile(uploadedFile)
      setError(null)

      const reader = new FileReader()
      reader.onload = () => setImageUrl(reader.result)
      reader.readAsDataURL(uploadedFile)
    } else {
      setError("Invalid file type or size. Max size: 25MB, Supported: PNG, JPG")
      setFile(null)
      setImageUrl(null)
    }
  }

  return (
    <div
      className={`${isDragging ? "bg-400" : "bg-300"} border-600 rounded-[10px] border-4 border-dashed px-10 py-10 text-center`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleImageDrop}
    >
      {file ? (
        <div className="flex flex-col items-center justify-center">
          <input type="file" className="hidden" onChange={handleFileInputChange} />
          <img src={imageUrl} width={200} height={200} />
          <h4 className="text-sm">Uploaded!</h4>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <input type="file" className="hidden" onChange={handleFileInputChange} />
          <span className="bg-100 mb-6 flex items-center justify-center rounded-full p-6">
            <UploadIcon size={64} />
          </span>
          <h4 className="text-sm">Drag Files Here</h4>
          <p className="mt-4 text-xl">Max size: 25MB, Supported: PNG, JPG</p>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </div>
  )
}
