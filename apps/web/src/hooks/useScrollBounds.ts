"use client"

import { useEffect, useState } from "react"

export function useScrollBounds<T extends HTMLElement>(
  element: React.RefObject<T | null>,
  enabled = true
) {
  const [dimensions, setScrollDimensions] = useState({
    width: 0,
    height: 0,
  })

  const { width, height } = dimensions

  useEffect(() => {
    if (!enabled) {
      setScrollDimensions({ width: 0, height: 0 })
      return
    }

    const scrollElement = element.current
    if (!scrollElement) return

    const updateDimensions = () => {
      setScrollDimensions({
        width: scrollElement.scrollWidth,
        height: scrollElement.scrollHeight,
      })
    }

    updateDimensions()

    const observer = new ResizeObserver(updateDimensions)
    observer.observe(scrollElement)

    return () => observer.disconnect()
  }, [element, enabled])

  return { width, height }
}
