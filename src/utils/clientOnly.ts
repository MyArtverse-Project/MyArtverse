/**
 * Fixes things that couldn't be resolved via server-side rendering.
 */
const clientOnly = typeof window === "undefined"

export default clientOnly