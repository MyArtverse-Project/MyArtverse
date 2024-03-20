/* eslint-disable import/no-internal-modules */
import { type NextRequest, NextResponse } from "next/server"
import { generateCSP } from "./utils/generateCSP"

export function middleware(request: NextRequest) {
  // Content-Security-Policy stuff
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")
  const cspRules = generateCSP({
    "script-src": [
      "self",
      "unsafe-eval",
      `nonce-${nonce}`,
      "https://eu.umami.is",
      "https://hcaptcha.com",
      "https://*.hcaptcha.com",
      "https://www.clarity.ms"
    ],
    "img-src": [
      "self",
      "data:",
      "unsafe-eval",
      "https://image.ctfassets.net",
      "http://localhost:9000"
    ],
    "connect-src": [
      "self",
      "unsafe-eval",
      "https://hcaptcha.com",
      "https://*.hcaptcha.com",
      "http://localhost:*"
    ],
    "base-uri": ["self"],
    "frame-ancestors": ["self", "https://www.youtube-nocookie.com/"],
    "upgrade-insecure-requests": true
  })

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("Content-Security-Policy", cspRules)
  requestHeaders.set("x-nonce", nonce)

  const res = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })

  res.headers.set("Content-Security-Policy", cspRules)
  res.headers.append("Access-Control-Allow-Credentials", "true")
  res.headers.append("Access-Control-Allow-Origin", "*")
  res.headers.append("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT")
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  )

  return res
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
