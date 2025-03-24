"use client"

import { useEffect, useState } from "react"

export function useScrollBounds<T extends HTMLElement>(
  element: React.RefObject<T>
) {
  const [dimensions, setScrollDimensions] = useState({
    width: 0,
    height: 0
  })

  const { width, height } = dimensions

  useEffect(() => {
    const scrollElement = element.current!

    setScrollDimensions({
      width: scrollElement.scrollWidth,
      height: scrollElement.scrollHeight
    })
  }, [element, setScrollDimensions])

  return { width, height }
}
