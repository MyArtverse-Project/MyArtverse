"use client"

import { useState } from "react"
import {
  LuCheck as Check,
  LuDownload as DownloadIcon,
  LuUpload as UploadIcon
} from "react-icons/lu"

export default function DropZone() {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  const handleDragEnter = () => setIsDragging(true)
  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const uploadedFile = e.dataTransfer.files[0]
    handleFile(uploadedFile)
  }

  const handleFileInputChange = (e) => {
    setIsDragging(false)
    const uploadedFile = e.target.files[0]
    handleFile(uploadedFile)
  }

  const handleFile = (uploadedFile) => {
    if (uploadedFile) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]
      const maxFileSize = 25 * 1024 * 1024

      if (
        allowedTypes.includes(uploadedFile.type) &&
        uploadedFile.size <= maxFileSize
      ) {
        setFile(uploadedFile)

        const reader = new FileReader()
        reader.onload = () => {
          setImageUrl(reader.result)
        }
        reader.readAsDataURL(uploadedFile)
      } else {
        setError("This bitch is too big")
      }
    }
  }

  return (
    <div
      className={`${
        isDragging ? "bg-400" : ""
      } bg- border-4 rounded-[10px] border-dashed border-600 bg-300 px-10 py-10 text-center`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {file ? (
        <div
          className="flex flex-col justify-center items-center"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={(e) => e.preventDefault()}
        >
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <img src={imageUrl} className="w-40 h-40 rounded-full mb-5" />
          <h4 className="text-sm">Uploaded!</h4>
          <p className="text-xl mt-4">Max size: 25MB, Supported: PNG, JPG</p>
        </div>
      ) : (
        <div
          className="flex flex-col justify-center items-center"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={(e) => e.preventDefault()}
        >
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <span className=" bg-100 p-6 justify-center items-center flex mb-6 rounded-full">
            <UploadIcon size={64} className="" />
          </span>
          <h4 className="text-sm">Drag Files Here</h4>
          <p className="text-xl mt-4">Max size: 25MB, Supported: PNG, JPG</p>
          {error && <p className="text-red">{error}</p>}
        </div>
      )}
    </div>
  )
}
