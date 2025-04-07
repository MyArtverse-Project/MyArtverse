"use client"

import { MotionConfig } from "framer-motion"

export function QueryClientWrapper({ children }: React.PropsWithChildren) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
