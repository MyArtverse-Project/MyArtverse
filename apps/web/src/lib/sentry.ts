import * as Sentry from "@sentry/nextjs"

export function getSentryDsn(): string | undefined {
  return process.env.NEXT_PUBLIC_SENTRY_DSN ?? process.env.SENTRY_DSN
}

export function isSentryEnabled(): boolean {
  return Boolean(getSentryDsn())
}

export function getSentryEnvironment(): string {
  return (
    process.env.SENTRY_ENVIRONMENT ??
    process.env.NEXT_PUBLIC_VERCEL_ENV ??
    process.env.VERCEL_ENV ??
    process.env.NODE_ENV ??
    "development"
  )
}

export function getSentryTracesSampleRate(): number {
  return Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? "0.1")
}

export function getBaseSentryInitOptions() {
  return {
    dsn: getSentryDsn(),
    enabled: isSentryEnabled(),
    environment: getSentryEnvironment(),
    tracesSampleRate: getSentryTracesSampleRate(),
    sendDefaultPii: false,
  }
}

export function captureSentryException(error: unknown): void {
  if (!isSentryEnabled()) {
    return
  }

  Sentry.captureException(error)
}
