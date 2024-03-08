import { type NextRequest, NextResponse } from "next/server"
import { generateCSP } from "./utils/generateCSP"

export function middleware(request: NextRequest) {
  // Content-Security-Policy
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")
  const requestHeaders = new Headers(request.headers)

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
    "img-src": ["self", "https://image.ctfassets.net"],
    "connect-src": ["self", "https://hcaptcha.com", "https://*.hcaptcha.com"],
    "frame-ancestors": ["none"],
    "upgrade-insecure-requests": true
  })

  requestHeaders.set("Content-Security-Policy", cspRules)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })

  response.headers.set("Content-Security-Policy", cspRules)

  return response
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
