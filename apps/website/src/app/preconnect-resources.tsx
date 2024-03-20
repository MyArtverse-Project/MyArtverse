"use client"

import { usePathname } from "next/navigation"
import ReactDOM from "react-dom"
import { isDevelopment } from "@/utils/env"

export default function PreconnectResources() {
  const path = usePathname()

  ReactDOM.prefetchDNS("https://eu.umami.is/")

  if (path.startsWith("/blog") || path.startsWith("/dashboard/overview")) {
    ReactDOM.preconnect("https://images.ctfassets.net/")
  }

  // Preconnect resources from localhost during development
  const _LOCALHOST_URL = "http://localhost" as const

  if (isDevelopment) {
    ReactDOM.prefetchDNS(`${_LOCALHOST_URL}:8081`)

    ReactDOM.preload(`${_LOCALHOST_URL}:8081`, { as: "fetch", fetchPriority: "high" })
    ReactDOM.preconnect(`${_LOCALHOST_URL}:9000`)
  }

  return null
}
