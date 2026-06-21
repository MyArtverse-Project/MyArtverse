"use client"

import { useScrollTitle, type ScrollTitleData } from "@/components/layouts/AppLayout/ScrollTitleContext"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

export function MastheadScrollTitle({
  scrollTitle,
  className,
  children
}: React.PropsWithChildren<{
  scrollTitle: ScrollTitleData
  className?: string
}>) {
  const ref = useRef<HTMLSpanElement>(null)
  const { register } = useScrollTitle()

  useEffect(() => {
    if (!ref.current) return
    return register(ref.current, scrollTitle)
  }, [register, scrollTitle])

  return (
    <span ref={ref} className={cn(className)}>
      {children}
    </span>
  )
}
