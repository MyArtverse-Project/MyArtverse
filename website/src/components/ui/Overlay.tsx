"use client"

import type { ChildrenNode } from "@/types"

interface OverlayProps extends ChildrenNode {
  state?: unknown
  toggler?: () => void
}

export default function Overlay({ children, state, toggler }: OverlayProps) {
  const overlayState = state
    ? "bg-opacity-40"
    : "bg-opacity-0 pointer-events-none"

  return (
    <div
      className="contents fixed z-[20] inset-0"
      data-overlay-container=""
      tabIndex={-1}
    >
      <div
        data-overlay=""
        className={`duration-[150ms] fixed z-[19] transition-all bg-black inset-0 ${overlayState}`}
        onClick={toggler}
      />
      <div className="fixed z-[20]" aria-hidden={!state ? "true" : undefined}>
        {children}
      </div>
    </div>
  )
}
