"use client"

/* eslint-disable react/forbid-elements */
import { useEffect, useRef, useState } from "react"
import cn from "@/utils/cn"
import { BACKEND_URL } from "@/utils/env"
import { LuUpload } from "react-icons/lu"
import type { MapElement } from "@/types/utils"
import MFImage from "../MFImage"

const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]
const maxFileSize = 10 * 1024 * 1024 // 10 MB

export default function DropZone({ setData, className = "", value = undefined }) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)
  const [success, setSuccess] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  // Clear file input value per render
  useEffect(() => {
    if (fileUploadRef.current) {
      fileUploadRef.current.value = ""
    }
  })

  const fileUploadRef = useRef<React.ElementRef<"input">>(null)

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
    }

    window.addEventListener("dragover", handleDragOver)

    return () => {
      window.removeEventListener("dragover", handleDragOver)
    }
  }, [])

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    setIsDragging(e.type === "dragenter" || e.type === "dragover")
  }

  const handleImageDrop = (e: React.DragEvent<MapElement<"div">>) => {
    e.preventDefault()
    e.stopPropagation()

    setIsDragging(false)
    const uploadedFile = e.dataTransfer.files[0]
    handleFile(uploadedFile)
  }

  const handleFileInputChange = (e: React.ChangeEvent<MapElement<"input">>) => {
    const uploadedFile = e.target.files[0]
    handleFile(uploadedFile)
  }

  const setStateToNull = () => {
    setFile(null)
    setImageUrl(null)
  }

  const handleFile = (uploadedFile: File) => {
    if (!uploadedFile) return

    const invalidFileType = !allowedTypes.includes(uploadedFile.type)
    if (invalidFileType) {
      setError("Invalid file type.")
      setStateToNull()
      return
    }

    const exceedFileSize = uploadedFile.size > maxFileSize
    if (exceedFileSize) {
      setError("File type must not exceed higher than 10MB!")
      setStateToNull()
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
    })
      .then((res) => {
        if (!res.ok)
          throw new Error(
            `Failed to upload image, ${res.status == 401 ? "Are you logged in?" : "."}`
          )
        res
          .json()
          .then((data) => {
            setData(data.url)
            setImageUrl(data.url)
            setUploading(false)
            setSuccess(true)
          })
          .catch((err) => {
            setSuccess(false)
            setUploading(false)
            setError(err.message)
          })
      })
      .catch((err) => {
        setSuccess(false)
        setUploading(false)
        setError(err.message)
      })
  }

  return (
    <div
      className={cn(
        isDragging ? "bg-300" : "bg-100",
        "border-600 rounded-md border-2 border-dashed bg-opacity-75 p-10 text-center transition-colors",
        className
      )}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleImageDrop}
    >
      {/* 
      TODO: needs rewrite
      TODO: - too confusing to read and code duplication
      TODO: - causes rerenders when a file is uploaded locally
      */}
      {success ? (
        <div className="flex flex-col items-center justify-center">
          <input type="file" className="hidden" onChange={handleFileInputChange} />
          <img alt="" src={imageUrl} width={200} height={200} />
          <span className="text-lg font-bold">Uploaded!</span>
        </div>
      ) : uploading ? (
        <div className="flex flex-col items-center justify-center">
          <span className="text-lg font-bold">Uploading...</span>
        </div>
      ) : file ? (
        <div className="flex flex-col items-center justify-center">
          <span className="text-lg font-bold">Failed to upload</span>
          <span>Try again, if issue continues try again later</span>
          <span>Error: {error}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <input
            ref={fileUploadRef}
            type="file"
            className="hidden"
            onChange={handleFileInputChange}
          />

          {value ? (
            <MFImage alt="" src={value} width={128} height={128} />
          ) : (
            <>
              <button
                className="bg-200 mb-6 flex items-center justify-center rounded-full p-8"
                onClick={() => fileUploadRef.current.click()}
              >
                <LuUpload size={48} />
              </button>
              <span className="text-lg font-bold">Drag and drop files here</span>
            </>
          )}
          <span className="mt-4">Max size: 10MB, Supported formats: .jpg, .png</span>
          <span className={cn("text-red-500", !error ? "hidden" : "")}>{error}</span>
        </div>
      )}
    </div>
  )
}
