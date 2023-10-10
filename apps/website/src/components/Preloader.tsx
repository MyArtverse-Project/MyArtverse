"use client"

import { useState, useEffect } from "react"
import clsx from "clsx"
import NoJSReminder from "./base/NoJSReminder"
import { MyFursona } from "./icons"

export default function Preloader() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [setLoaded])

  return (
    <div id="preloader">
      <NoJSReminder />
      <div
        className={clsx(
          !loaded ? "opacity-100" : "opacity-0 pointer-events-none",
          "z-[9998] fixed inset-0 bg-100 grid place-items-center delay-200 duration-150"
        )}
      >
        <MyFursona logoOnly size={2.5} />
      </div>
    </div>
  )
}
