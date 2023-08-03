"use client"

import { IncludeReactNode } from "@/types"
import { SessionProvider } from "next-auth/react"

export default function Provider({
  children,
  session
}: IncludeReactNode<{
  session?: any
}>) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
