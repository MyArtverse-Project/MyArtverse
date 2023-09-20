import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { generateCSP } from "./utils"

export default function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const generatedNonce = crypto.randomUUID()

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
      "assets.hcaptcha.com",
      "api.stripe.com",
      "analytics.umami.is"
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

  requestHeaders.set("Content-Encoding", "br")
  requestHeaders.set("Content-Security-Policy", csp)
  requestHeaders.set("x-nonce", generatedNonce)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })

  response.headers.set("Content-Encoding", "br")
  response.headers.set("Content-Security-Policy", csp)
  // This header technically not supported by most browsers
  // as it's a non-standard, but it's here just for good measure.
  response.headers.set("X-XSS-Protection", "1; mode=block")

  return response
}
