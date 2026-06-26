export function formatCompactCount(count: number): string {
  if (count < 1000) return String(count)
  if (count < 1_000_000) {
    const value = count / 1000
    const formatted = value >= 10 ? Math.round(value) : Math.round(value * 10) / 10
    return `${formatted}k`
  }
  const value = count / 1_000_000
  const formatted = value >= 10 ? Math.round(value) : Math.round(value * 10) / 10
  return `${formatted}m`
}
