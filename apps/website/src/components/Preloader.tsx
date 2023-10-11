"use client"

import { useState, useEffect, useRef } from "react"
import clsx from "clsx"
import NoJSReminder from "./base/NoJSReminder"
import { MyFursona } from "./icons"

export default function Preloader() {
  const [loaded, setLoaded] = useState(false)

  const preloaderRef = useRef(null)
  useEffect(() => {
    if (document.readyState == "complete") {
      setLoaded(true)
      preloaderRef.current.setAttribute("data-loaded", "")
    }
  }, [setLoaded])

  return (
    <div id="preloader" ref={preloaderRef}>
      <NoJSReminder />
      <div
        className={clsx(
          !loaded ? "opacity-100" : "opacity-0 pointer-events-none",
          "z-[9998] fixed inset-0 bg-100 grid place-items-center duration-100"
        )}
      >
        <MyFursona logoOnly size={2.5} />
        <div
          id="stagger1"
          className="absolute shadow-2xl shadow-violet-600 w-[16rem] h-[16rem] rounded-3xl"
        />
        <div
          id="stagger2"
          className="absolute shadow-2xl shadow-purple-400 w-[24rem] h-[24rem] rounded-3xl"
        />
      </div>
    </div>
  )
}
