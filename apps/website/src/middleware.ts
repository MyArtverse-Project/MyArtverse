import { type NextRequest, NextResponse } from "next/server"
import { isProduction } from "./utils/env"
import { generateCSP } from "./utils/generateCSP"

export function middleware(request: NextRequest) {
  // Enable these CSP rules on production and not on dev servers
  if (isProduction) {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64")
    const cspRules = generateCSP({
      "script-src": [
        "self",
        "unsafe-eval",
        `nonce-${nonce}`,
        "https://*.umami.is",
        "https://hcaptcha.com",
        "https://*.hcaptcha.com",
        "https://www.clarity.ms"
      ],
      "img-src": ["self", "unsafe-eval", "https://image.ctfassets.net"],
      "connect-src": ["self", "https://hcaptcha.com", "https://*.hcaptcha.com"],
      "frame-ancestors": ["none"],
      "upgrade-insecure-requests": true
    })

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("Content-Security-Policy", cspRules)

    const response = NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })

    response.headers.set("Content-Security-Policy", cspRules)

    return response
  }
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" }
      ]
    }
  ]
}
