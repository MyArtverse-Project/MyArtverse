"use client"

import { useState, useEffect } from "react"

export function useScrollBounds<T extends HTMLElement>(
  el: React.MutableRefObject<T>
) {
  const [{ width, height }, setScrollStates] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const scrollEl = el.current

    setScrollStates({
      width: scrollEl.scrollWidth,
      height: scrollEl.scrollHeight
    })
  }, [el, setScrollStates])

  return { width, height }
}
