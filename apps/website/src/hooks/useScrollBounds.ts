"use client"

import { useEffect, useState } from "react"

export function useScrollBounds<T extends HTMLElement>(
  element: React.MutableRefObject<T>
) {
  const [dims, setScrollStates] = useState({
    width: 0,
    height: 0
  })

  const { width, height } = dims

  useEffect(() => {
    const scrollElement = element.current!

    setScrollStates({
      width: scrollElement.scrollWidth,
      height: scrollElement.scrollHeight
    })
  }, [element, setScrollStates])

  return { width, height }
}
