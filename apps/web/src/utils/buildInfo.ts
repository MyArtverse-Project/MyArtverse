import { getServerApiUrl } from "@/utils/apiUrl"

const frontendCommitEnv = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.trim() ?? ""

export function getFrontendCommit(): string | null {
  return frontendCommitEnv || null
}

export function shortCommit(sha: string) {
  return sha.slice(0, 7)
}

export async function getApiCommit(): Promise<string | null> {
  try {
    const response = await fetch(`${getServerApiUrl()}/health`, {
      next: { revalidate: 300 },
    })

    if (!response.ok) return null

    const data = (await response.json()) as { commit?: string | null }
    const commit = data.commit?.trim()
    return commit || null
  } catch {
    return null
  }
}
