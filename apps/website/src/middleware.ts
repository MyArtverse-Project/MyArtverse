import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { generateCSP } from "./utils"

export default function middleware(request: NextRequest) {
  const generatedNonce = Buffer.from(crypto.randomUUID()).toString("base64")

  const csp = generateCSP({
    "default-src": ["self"],
    "script-src": [
      "self",
      "unsafe-eval",
      "https:",
      "assets.hcaptcha.com",
      "www.clarity.ms",
      "analytics.umami.is",
      `nonce-${generatedNonce}`
    ],
    "style-src": ["self", "unsafe-inline"],
    "connect-src": [
      "self",
      "https:",
      "assets.hcaptcha.com",
      "api.stripe.com",
      "analytics.umami.is",
      "api.umami.is",
      "w.clarity.ms"
    ],
    "frame-src": [
      "https://www.youtube-nocookie.com",
      "https://hooks.stripe.com",
      "https://js.stripe.com"
    ],
    "frame-ancestors": ["none"],
    "img-src": ["self", "data:", "https://c.bing.com", "https://c.clarity.ms"],
    "upgrade-insecure-requests": true
  })

  const requestHeaders = new Headers()
  requestHeaders.set("Content-Encoding", "br")
  requestHeaders.set("Content-Security-Policy", csp)
  requestHeaders.set("x-nonce", generatedNonce)
  // This header technically not supported by most browsers
  // as it's a non-standard, but it's here just for good measure.
  requestHeaders.set("X-XSS-Protection", "1; mode=block")

  const response = NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders
    }
  })

  return response
}
