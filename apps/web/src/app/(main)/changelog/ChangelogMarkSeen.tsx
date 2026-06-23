"use client"

import { markChangelogSeen } from "@/utils/changelogSeen"
import { useEffect } from "react"

export default function ChangelogMarkSeen({ version }: { version: string }) {
  useEffect(() => {
    markChangelogSeen(version)
  }, [version])

  return null
}
