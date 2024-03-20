"use client"

import { useEffect } from "react"
import gsap from "gsap"

export function useGSAPContext(callback: gsap.ContextFunc, scope: string | object) {
  useEffect(() => {
    const ctx = gsap.context(callback, scope)

    return () => ctx.revert()
  }, [callback, scope])
}
