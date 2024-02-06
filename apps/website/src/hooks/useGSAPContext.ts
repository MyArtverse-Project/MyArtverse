"use client"

import gsap from "gsap"
import { useEffect } from "react"

export default function useGSAPContext(callback: gsap.ContextFunc, scope: string | object) {
  useEffect(() => {
    const ctx = gsap.context(callback, scope)

    return () => ctx.revert()
  }, [callback, scope])
}
