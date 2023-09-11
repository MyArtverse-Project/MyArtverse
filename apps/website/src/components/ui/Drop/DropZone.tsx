import { DownloadIcon, UploadIcon } from "lucide-react"
import React, { useState } from "react"

export default function DropZone() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState(null)

  return (
    <div
      className={`${
        isDragging && "bg-400"
      } bg- border-4 rounded-[10px] border-dashed border-600 bg-300 px-10 py-10 text-center`}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(file) => setFile(file)}
    >
      <div className="flex flex-col justify-center items-center">
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(file) => setFile(file.target.files[0])}
        />
        <span className=" bg-100 p-6 justify-center items-center flex mb-6 rounded-full">
          <UploadIcon size={64} className="" />
        </span>
        <h4 className="text-sm">Drag Files Here</h4>
        <p className="text-xl mt-4">Max size: 25MB, Supported: PNG, JPG</p>
      </div>
    </div>
  )
}
