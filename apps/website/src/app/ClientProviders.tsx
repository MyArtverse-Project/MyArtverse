"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { MotionConfig } from "framer-motion"

export default function QueryClientWrapper({ children }: { children?: React.ReactNode }) {
  const [queryMeDaddy] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryMeDaddy}>
      <MotionConfig reducedMotion="user">
        {children}
        <ReactQueryDevtools />
      </MotionConfig>
    </QueryClientProvider>
  )
}
