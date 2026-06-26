import { cn } from "@mav/shared/utils"
import React from "react"

export default function ModalBody({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-y-1 px-4 pb-3", className)}>
      {children}
    </div>
  )
}
