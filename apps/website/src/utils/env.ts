export const isProduction = process.env.NODE_ENV === "production"
export const isDevelopment = process.env.NODE_ENV === "development"

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8081/"

export const UMAMI_ID = process.env.UMAMI_ID || "xxx"
export const MS_CLARITY_ID = process.env.MS_CLARITY_ID || "xxx"

export const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
export const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET

// prettier-ignore
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
