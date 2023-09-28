"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import clsx from "clsx"

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
    return
  }, [state])

  return (
    <Portal>
      <div
        onClick={toggler as () => any}
        className={clsx(
          "duration-[350ms] fixed z-[99] transition-all bg-black/60 inset-0",
          state ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />
      <div id="overlay-wrapper" className="fixed z-[100]">
        {children}
      </div>
    </Portal>
  )
}
