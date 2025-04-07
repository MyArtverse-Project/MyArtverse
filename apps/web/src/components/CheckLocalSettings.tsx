"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react"

const _checkLocalStorage = (key: string, value: unknown): string | void => {
  const ls = window.localStorage
  const lsItem = ls.getItem(key)

  if (!lsItem) {
    if (!value) {
      throw new Error(
        `The key "${key}" doesn't exist and a value isn't provided`
      )
    }

    if (typeof value === "object") {
      ls.setItem(key, JSON.stringify(value))
      return
    }

    ls.setItem(key, value as string)
    return
  }

  if (lsItem.startsWith("{") || lsItem.startsWith("[")) {
    return JSON.parse(lsItem)
  }

  return lsItem.toString()
}

export function CheckLocalSettings() {
  useEffect(() => {
    const _reducedAnimations = window.matchMedia(
      "(prefers-reduced-motion)"
    ).matches
  }, [])

  return null
}
