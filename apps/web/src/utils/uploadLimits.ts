/** Fallback when upload limit is not yet loaded from the API. */
export const DEFAULT_UPLOAD_LIMIT_BYTES = 10 * 1024 * 1024

export function formatUploadLimit(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    const mb = bytes / (1024 * 1024)
    return Number.isInteger(mb) ? `${mb}MB` : `${mb.toFixed(1)}MB`
  }

  return `${Math.round(bytes / 1024)}KB`
}

export function resolveUploadLimitBytes(
  effectiveUploadLimitBytes?: number | null
): number {
  if (
    effectiveUploadLimitBytes != null &&
    effectiveUploadLimitBytes > 0
  ) {
    return effectiveUploadLimitBytes
  }

  return DEFAULT_UPLOAD_LIMIT_BYTES
}
