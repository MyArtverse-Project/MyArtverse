"use client"

import { useEffect } from "react"
import type { IncludeReactNode } from "@/types"

export default function Overlay({
  children,
  state,
  toggler
}: IncludeReactNode<{
  state?: unknown
  toggler?: () => void
}>) {
  const overlayState = state
    ? "bg-opacity-40"
    : "bg-opacity-0 pointer-events-none"

  useEffect(() => {
    const bodyStyle = document.body.style

    state ? (bodyStyle.overflowY = "hidden") : (bodyStyle.overflowY = "auto")
  }, [state])

  return (
    <div
      className="contents fixed z-[20] inset-0"
      data-overlay-container=""
      tabIndex={-1}
    >
      <div
        data-overlay-screen=""
        className={`duration-[350ms] fixed z-[19] transition-all bg-black inset-0 ${overlayState}`}
        onClick={toggler}
      />
      <div className="fixed z-[20]">{children}</div>
    </div>
  )
}
