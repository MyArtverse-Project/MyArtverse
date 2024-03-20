"use client"

import { usePathname } from "next/navigation"

export function usePathStartsWith(url: string) {
  const path = usePathname()

  return path.startsWith(url)
}
