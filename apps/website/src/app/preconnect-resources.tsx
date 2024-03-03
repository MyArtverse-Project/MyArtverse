"use client"

import { usePathname } from "next/navigation"
import ReactDOM from "react-dom"

export default function PreconnectResources() {
  const p = usePathname()

  if (p.startsWith("/blog") || p.startsWith("/dashboard/overview")) {
    ReactDOM.preconnect("https://images.ctfassets.net/")
  }

  return null
}
