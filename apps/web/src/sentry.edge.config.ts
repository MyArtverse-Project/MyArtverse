import * as Sentry from "@sentry/nextjs"
import { getBaseSentryInitOptions } from "./lib/sentry"

Sentry.init(getBaseSentryInitOptions())
