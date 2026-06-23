import ChangelogMarkSeen from "./ChangelogMarkSeen"
import { getChangelog } from "@/lib/changelog"
import { buildPageMetadata } from "@/utils/metadata"
import { BRAND } from "@mav/shared"
import type { Metadata } from "next"
import ReactMarkdown from "react-markdown"

export function generateMetadata(): Metadata {
  const changelog = getChangelog()

  return buildPageMetadata({
    title: "Changelog",
    description: `See what's new on ${BRAND}.`,
    path: "/changelog",
  })
}

export default function ChangelogPage() {
  const changelog = getChangelog()

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <ChangelogMarkSeen version={changelog.version} />

      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Changelog</h1>
        {changelog.title ? (
          <p className="text-muted-foreground text-lg">{changelog.title}</p>
        ) : null}
        <p className="text-muted-foreground text-sm">
          Release {changelog.version}
        </p>
      </header>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown>{changelog.body}</ReactMarkdown>
      </article>
    </div>
  )
}
