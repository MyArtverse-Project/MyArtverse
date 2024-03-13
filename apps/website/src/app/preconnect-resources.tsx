"use client"

import { usePathname } from "next/navigation"
import ReactDOM from "react-dom"
import { isDevelopment } from "@/utils/env"

export default function PreconnectResources() {
  const p = usePathname()

  if (p.startsWith("/blog") || p.startsWith("/dashboard/overview")) {
    ReactDOM.preconnect("https://images.ctfassets.net/")
  }

  const _LOCALHOST_URL = "http://localhost:8081/"

  // Preconnect resources localhost during development
  if (isDevelopment) {
    ReactDOM.prefetchDNS(_LOCALHOST_URL)
    ReactDOM.preconnect(_LOCALHOST_URL)
  }

  return null
}
