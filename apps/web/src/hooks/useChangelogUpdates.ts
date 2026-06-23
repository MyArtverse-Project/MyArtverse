"use client"

import {
  CHANGELOG_SEEN_EVENT,
  getSeenChangelogVersion,
  markChangelogSeen,
} from "@/utils/changelogSeen"
import { useCallback, useEffect, useState } from "react"

type ChangelogMeta = {
  version: string
  title?: string
}

export function useChangelogUpdates() {
  const [meta, setMeta] = useState<ChangelogMeta | null>(null)
  const [hasUpdates, setHasUpdates] = useState(false)

  const markSeen = useCallback(() => {
    if (!meta?.version) return
    markChangelogSeen(meta.version)
    setHasUpdates(false)
  }, [meta?.version])

  useEffect(() => {
    let cancelled = false

    fetch("/api/changelog")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: ChangelogMeta | null) => {
        if (cancelled || !data?.version) return
        setMeta(data)
        setHasUpdates(getSeenChangelogVersion() !== data.version)
      })
      .catch(() => {})

    const onSeen = () => setHasUpdates(false)

    window.addEventListener(CHANGELOG_SEEN_EVENT, onSeen)
    return () => {
      cancelled = true
      window.removeEventListener(CHANGELOG_SEEN_EVENT, onSeen)
    }
  }, [])

  return {
    hasUpdates,
    markSeen,
    version: meta?.version ?? null,
    title: meta?.title ?? null,
  }
}
