"use client"

import { useState, useEffect } from "react"
import { Folder, FolderClosed, FolderOpen } from "lucide-react"
import { Button } from "../Buttons"

export default function FolderItem({
  children,
  name,
  isOpen = false,
  active
}: {
  name?: string
  isOpen?: boolean
  active?: boolean
  children?: React.ReactNode
}) {
  const DynamicFolderIcon = !isOpen ? Folder : FolderOpen
  return (
    <div className="w-full" data-folder-item="" data-is-open={isOpen}>
      <Button
        className={[
          "w-full flex flex-row items-center px-3 py-2 rounded-md cursor-pointer",
          !active ? "hover:text-500" : "text-500"
        ].join(" ")}
        prefixIcon={<DynamicFolderIcon size={21} className="mr-2" />}
      >
        <p className="font-semibold">{name}</p>
      </Button>
      {children}
    </div>
  )
}
