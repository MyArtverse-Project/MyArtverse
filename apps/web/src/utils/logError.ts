const isDevelopment = process.env.NODE_ENV === "development"

/**
 * Logs the actual error to the server logs while running in development.
 *
 * In production this stays silent so we never leak internal details, but in
 * development we surface the real error (status, body, stack) instead of
 * swallowing it behind a generic "something went wrong" message.
 */
export const logError = (context: string, error: unknown) => {
  if (!isDevelopment) return

  console.error(`[MyArtverse] ${context}:`, error)
}
