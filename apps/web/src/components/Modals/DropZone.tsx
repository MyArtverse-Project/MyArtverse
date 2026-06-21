"use client"

import type { MapElement } from "@/types/utils"
import { BACKEND_URL } from "@/utils/constants"
import { cn } from "@mav/shared/utils"
import { type ComponentType, useEffect, useRef, useState } from "react"
import { LuUpload } from "react-icons/lu"
import EasyCrop, { type CropperProps } from "react-easy-crop"
import { Button } from "@/components/ui/button"

const Cropper = EasyCrop as ComponentType<
  Partial<CropperProps> & Pick<CropperProps, "crop" | "onCropChange">
>

const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]
const maxFileSize = 10 * 1024 * 1024 // 10 MB

const uniqueUploadName = (originalName?: string) => {
  const ext = originalName?.includes(".")
    ? originalName.slice(originalName.lastIndexOf("."))
    : ".png"
  return `${crypto.randomUUID()}${ext}`
}

const getCroppedImg = (imageSrc: string, crop: any, zoom: number, aspect: number): Promise<{base64: string, blob: Blob}> => {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const scale = image.naturalWidth / image.width
      const cropX = crop.x * scale
      const cropY = crop.y * scale
      const cropWidth = crop.width * scale
      const cropHeight = crop.height * scale

      canvas.width = cropWidth
      canvas.height = cropHeight
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        reject(new Error("Could not get Canvas context"))
        return
      }

      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      )

      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error("Crop canvas is empty"))
          return
        }

        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          resolve({
            base64: reader.result as string,
            blob
          })
        }
      }, "image/png")
    }
    image.onerror = err => reject(new Error("Failed to load image for cropping."))
    image.src = imageSrc
  })
}

export default function DropZone({
  setData,
  className = "",
  value = null,
  aspectRatio = "1",
  label = "Drag and drop files here",
  enableCrop = true,
  previewSize = "default",
}: {
  setData: (url: string) => void
  className?: string
  value?: string | null
  aspectRatio?: string,
  label?: string
  enableCrop?: boolean
  previewSize?: "default" | "large" | "compact"
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(value)
  const [base64Src, setBase64Src] = useState<string | null>(null)
  const [croppedBase64, setCroppedBase64] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCrop, setShowCrop] = useState(false)

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

  const fileUploadRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setImageUrl(value)
  }, [value])

  useEffect(() => {
    if (fileUploadRef.current) fileUploadRef.current.value = ""
  }, [base64Src, imageUrl, croppedBase64])

  const openFilePicker = () => fileUploadRef.current?.click()

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
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedAreaPixels(null)
    setCroppedBase64(null)
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target?.result as string
      setBase64Src(src)
      if (enableCrop) {
        setShowCrop(true)
      } else {
        uploadFile(uploadedFile)
      }
    }
    reader.readAsDataURL(uploadedFile)
  }

  const uploadFile = async (file: Blob, filename = "upload.png") => {
    setUploading(true)
    try {
      const formData = new FormData()
      const uploadName = uniqueUploadName(
        file instanceof File ? file.name : filename
      )
      formData.append("file", file, uploadName)
      const resp = await fetch(`${BACKEND_URL}/v1/profile/upload`, {
        method: "POST",
        body: formData,
        credentials: "include"
      })
      if (!resp.ok)
        throw new Error(
          resp.status === 401 ? "Are you logged in?" : "Upload failed"
        )
      const data = await resp.json()
      const url = data.url as string
      setData(url)
      setImageUrl(url)
      setCroppedBase64(null)
      setShowCrop(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    } finally {
      setUploading(false)
    }
  }

  const handleCropAndSave = async () => {
    if (!base64Src || !croppedAreaPixels) return

    setError(null)
    try {
      const aspect = aspectRatio ? parseFloat(aspectRatio) : 1
      const { blob } = await getCroppedImg(
        base64Src,
        croppedAreaPixels,
        zoom,
        aspect
      )
      setShowCrop(false)
      setCroppedBase64(null)
      setBase64Src(null)
      await uploadFile(blob, "cropped.png")
    } catch (err) {
      setError("Cropping failed: " + (err as Error).message)
      setShowCrop(true)
    }
  }

  const displayImg = () => {
    const img = croppedBase64 ? croppedBase64 : imageUrl || base64Src
    if (!img) return null
    return img
  }

  const hasPreview = !!(displayImg() && !showCrop && !uploading)
  const isLargePreview = previewSize === "large"
  const isCompactPreview = previewSize === "compact"

  return (
    <div
      className={cn(
        "rounded-lg border text-center transition-colors",
        isCompactPreview && !showCrop && "size-28 shrink-0",
        hasPreview
          ? cn(
              "border-border bg-card",
              isCompactPreview ? "overflow-hidden p-0" : "p-4"
            )
          : cn(
              "border-dashed",
              isCompactPreview
                ? "border-border/60 p-2"
                : cn("border-2", isLargePreview ? "p-8" : "p-10"),
              isDragging ? "bg-muted/50" : "bg-muted/20"
            ),
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
        accept={allowedTypes.join(",")}
        className="hidden"
        onChange={handleFileInputChange}
      />
      {showCrop && base64Src && enableCrop ? (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
          <div className="w-full mb-6 relative" style={{ height: "min(400px, 60vh)" }}>
            <Cropper
              image={base64Src}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio ? parseFloat(aspectRatio) : 1}
              cropShape="rect"
              showGrid={true}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropAreaChange={(_, croppedAreaPixelsValue) => {
                setCroppedAreaPixels(croppedAreaPixelsValue)
              }}
              style={{
                containerStyle: { 
                  height: "100%", 
                  width: "100%", 
                  position: "relative",
                  maxHeight: "400px",
                  backgroundColor: "#f3f4f6"
                }
              }}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={e => setZoom(Number(e.target.value))}
                className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium whitespace-nowrap">Zoom: {zoom.toFixed(2)}x</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={handleCropAndSave}
                disabled={!croppedAreaPixels || uploading}
                className="px-4 py-2"
                type="button"
              >
                {uploading ? "Saving..." : "Save Image"}
              </Button>
              <Button
                onClick={() => {
                  setShowCrop(false)
                  setBase64Src(null)
                  setCroppedBase64(null)
                  setCroppedAreaPixels(null)
                }}
                variant="secondary"
                className="px-4 py-2"
                type="button"
              >
                Cancel
              </Button>
            </div>
          </div>

          {error && <span className="mt-4 text-red-500">{error}</span>}
        </div>
      ) : uploading ? (
        <span
          className={cn(
            "font-medium",
            isCompactPreview ? "text-xs" : "text-lg font-bold"
          )}
        >
          Uploading...
        </span>
      ) : displayImg() ? (
        isLargePreview ? (
          <div className="flex w-full flex-col gap-3 text-left">
            <div className="flex min-h-72 w-full items-center justify-center overflow-hidden rounded-md sm:min-h-80">
              <img
                src={displayImg() as string}
                alt="Uploaded"
                className="max-h-[min(28rem,55vh)] w-full object-contain object-center"
              />
            </div>
            <Button
              onClick={openFilePicker}
              variant="outline"
              className="w-full shrink-0"
              type="button"
            >
              Replace image
            </Button>
            {error && <span className="text-destructive text-sm">{error}</span>}
          </div>
        ) : isCompactPreview ? (
          <button
            type="button"
            onClick={openFilePicker}
            className="group relative size-full overflow-hidden rounded-lg"
            aria-label="Change avatar"
          >
            <img
              src={displayImg() as string}
              alt="Avatar preview"
              className="size-full object-cover"
            />
            <span className="bg-background/80 text-foreground absolute inset-x-0 bottom-0 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100">
              Change
            </span>
          </button>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <img
              src={displayImg() as string}
              alt="Uploaded"
              style={{
                maxWidth: 240,
                maxHeight: 240,
                objectFit: "contain",
              }}
            />
            <Button onClick={openFilePicker} variant="secondary" type="button">
              Change image
            </Button>
            {error && <span className="text-destructive text-sm">{error}</span>}
          </div>
        )
      ) : (
        <div
          className={cn(
            "flex flex-col items-center",
            isLargePreview && "min-h-72 justify-center gap-4",
            isCompactPreview && "size-full justify-center gap-1"
          )}
        >
          <button
            className={cn(
              "flex items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80",
              isLargePreview ? "p-6" : isCompactPreview ? "p-2.5" : "mb-6 p-8"
            )}
            onClick={openFilePicker}
            type="button"
            aria-label={label}
          >
            <LuUpload size={isLargePreview ? 40 : isCompactPreview ? 18 : 48} />
          </button>
          {!isCompactPreview && (
            <>
              <span className="text-lg font-semibold">{label}</span>
              <span className="text-muted-foreground text-sm">
                Max size: 10MB · .jpg, .png
              </span>
            </>
          )}
          {isCompactPreview && (
            <span className="text-muted-foreground text-[11px] leading-tight">
              Add photo
            </span>
          )}
          {error && (
            <span
              className={cn(
                "text-destructive",
                isCompactPreview ? "text-[10px] leading-tight" : "text-sm"
              )}
            >
              {error}
            </span>
          )}
        </div>
      )}
    </div>
  )
}