import { useEffect } from "react"
import dynamic from "next/dynamic"
import type { IncludeReactNode } from "@/types"

const Portal = dynamic(() => import("./Portal"), { ssr: false })

export default function Overlay({
  children,
  state,
  toggler
}: IncludeReactNode<{
  state?: unknown
  toggler?: () => void
}>) {
  const overlayState = state ? "opacity-100" : "opacity-0 pointer-events-none"

  useEffect(() => {
    const bodyStyle = document.body.style

    state ? (bodyStyle.overflowY = "hidden") : (bodyStyle.overflowY = "auto")
  }, [state])

  return (
    <Portal>
      <div
        data-overlay-screen=""
        className={`duration-[350ms] fixed z-[19] transition-all bg-black/40 inset-0 ${overlayState}`}
        onClick={toggler}
      />
      <div data-overlay-wrapper="" className="fixed z-[20]">
        {children}
      </div>
    </Portal>
  )
}
