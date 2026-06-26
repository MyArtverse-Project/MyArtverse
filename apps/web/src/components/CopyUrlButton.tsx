"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { LuCheck, LuLink2 } from "react-icons/lu"
import { toast } from "sonner"

export default function CopyUrlButton({
  path,
  className,
}: {
  path: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const copyUrl = async () => {
    const url = new URL(path, window.location.origin).href

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success("Link copied to clipboard")
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Failed to copy link")
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      aria-label="Copy URL"
      onClick={copyUrl}
      className={cn(className)}
    >
      {copied ? <LuCheck size={18} /> : <LuLink2 size={18} />}
      {copied ? "Copied" : "Copy URL"}
    </Button>
  )
}
