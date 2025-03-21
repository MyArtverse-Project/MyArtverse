"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from "next/dynamic"
import { useEffect } from "react"
import cn from "@/utils/cn"

const Portal = dynamic(() => import("./Portal"), { ssr: false })

export default function Overlay({
  children,
  state,
  toggler
}: {
  children?: React.ReactNode
  state?: unknown
  toggler?: React.Dispatch<React.SetStateAction<boolean>>
}) {
  useEffect(() => {
    const bodyStyle = document.body.style

    if (!state) {
      bodyStyle.overflowY = "auto"
      return
    }

    bodyStyle.overflowY = "hidden"
  }, [state])

  return (
    <Portal>
      <div
        onClick={toggler as () => any}
        className={cn(
          "fixed inset-0 z-[99] bg-black/60 transition-all duration-[350ms]",
          state ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <div className="fixed z-[100]">{children}</div>
    </Portal>
  )
}
