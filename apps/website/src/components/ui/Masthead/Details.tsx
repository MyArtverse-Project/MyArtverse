"use client"

import { useEffect, useRef } from "react"

export default function MastheadDetails({
  children,
  peekToggler
}: {
  children?: React.ReactNode
  peekToggler?: () => unknown
}) {
  const detailWrapperRef = useRef<React.ElementRef<"div">>(null)

  useEffect(() => {
    const profileDetails = detailWrapperRef.current

    const io = new IntersectionObserver(
      ([entry]) => {
        console.log(entry.isIntersecting)
      },
      { rootMargin: "-7% 0%" }
    )

    io.observe(profileDetails)
  }, [])
  return (
    <section ref={detailWrapperRef} className="flex w-full flex-col gap-y-2">
      {children}
    </section>
  )
}
