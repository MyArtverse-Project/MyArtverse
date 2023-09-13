"use client"

import { useState, useEffect } from "react"

import { Folder, FolderClosed, FolderIcon, FolderOpen } from "lucide-react"

export default function FolderItem({
  children,
  name,
  isOpen,
  active
}: {
  name?: string
  isOpen?: boolean
  active?: boolean
  children?: React.ReactNode
}) {
  return (
    <div data-folder-item="">
      <div
        className={[
          `flex flex-row items-center px-4 py-3 rounded-md`,
          !active ? "bg-500 text-100" : ""
        ].join(" ")}
      >
        <span className="mr-2" data-is-open={isOpen}>
          {!isOpen ? <Folder /> : <FolderOpen />}
        </span>
        <p className="text-md font-semibold">{name}</p>
      </div>
      {children}
    </div>
  )
}
