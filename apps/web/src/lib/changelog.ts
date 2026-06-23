import fs from "node:fs"
import path from "node:path"

export type ChangelogData = {
  version: string
  title?: string
  body: string
}

const CHANGELOG_PATH = path.join(process.cwd(), "content", "CHANGELOG.md")

function parseFrontmatterValue(block: string, key: string) {
  const match = block.match(
    new RegExp(`^${key}:\\s*["']?([^"'\\n]+)["']?`, "m")
  )
  return match?.[1]?.trim()
}

export function getChangelog(): ChangelogData {
  const raw = fs.readFileSync(CHANGELOG_PATH, "utf8")
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)

  if (!match) {
    return { version: "0", body: raw.trim() }
  }

  const frontmatter = match[1]
  const body = match[2].trim()

  return {
    version: parseFrontmatterValue(frontmatter, "version") ?? "0",
    title: parseFrontmatterValue(frontmatter, "title"),
    body,
  }
}

export function getChangelogVersion() {
  return getChangelog().version
}
