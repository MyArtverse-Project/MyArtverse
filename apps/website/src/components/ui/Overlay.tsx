"use client"

import { useEffect, useContext } from "react"
import dynamic from "next/dynamic"
import clsx from "clsx"
import { UAContext } from "@quentin-sommer/react-useragent"

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
  const { parser } = useContext(UAContext)
  useEffect(() => {
    const bodyStyle = document.body.style

    const browser = parser.getBrowser()
    const isChrome = browser.name === "Brave" || browser.name === "Chrome"

    if (!state) {
      bodyStyle.overflowY = "auto"
      if (isChrome) {
        bodyStyle.marginRight = "0px"
      }
      return
    }

    bodyStyle.overflowY = "hidden"

    if (isChrome) {
      bodyStyle.marginRight = "13px"
    }
    return
  }, [state, parser])

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
