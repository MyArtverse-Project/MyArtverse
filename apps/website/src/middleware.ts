import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { generateCSP } from "./utils/generateCSP"

export function middleware(request: NextRequest) {
  const generatedNonce = Buffer.from(crypto.randomUUID()).toString("base64")

  const csp = generateCSP({
    "default-src": ["self"],
    "script-src": [
      "self",
      "unsafe-eval",
      "https:",
      "assets.hcaptcha.com",
      "www.clarity.ms",
      "analytics.eu.umami.is",
      "cdn.onesignal.com",
      `nonce-${generatedNonce}`
    ],
    "style-src": ["self", "unsafe-inline"],
    "connect-src": [
      "self",
      "https:",
      "assets.hcaptcha.com",
      "api.stripe.com",
      "api.umami.is",
      "analytics.eu.umami.is",
      "cdn.onesignal.com",
      "w.clarity.ms"
    ],
    "frame-src": [
      "https://www.youtube-nocookie.com",
      "https://hooks.stripe.com",
      "https://js.stripe.com"
    ],
    "frame-ancestors": ["none"],
    "img-src": ["self", "data:", "https:", "c.bing.com", "c.clarity.ms"],
    "upgrade-insecure-requests": true
  })

  const requestHeaders = new Headers(request.headers)

  requestHeaders.set("Content-Security-Policy", csp)
  requestHeaders.set("x-nonce", generatedNonce)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })

  response.headers.set("Content-Encoding", "br")
  response.headers.set("Content-Security-Polilcy", csp)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" }
      ]
    }
  ]
}
