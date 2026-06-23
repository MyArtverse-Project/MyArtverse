export const CHANGELOG_SEEN_STORAGE_KEY = "mav:last-seen-changelog-version"

export const CHANGELOG_SEEN_EVENT = "mav:changelog-seen"

export function getSeenChangelogVersion() {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(CHANGELOG_SEEN_STORAGE_KEY)
}

export function markChangelogSeen(version: string) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(CHANGELOG_SEEN_STORAGE_KEY, version)
  window.dispatchEvent(
    new CustomEvent(CHANGELOG_SEEN_EVENT, { detail: version })
  )
}

export function hasUnseenChangelog(currentVersion: string) {
  const seen = getSeenChangelogVersion()
  return seen !== currentVersion
}
