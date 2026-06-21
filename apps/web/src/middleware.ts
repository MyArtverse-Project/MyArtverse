import {
  getBackendOrigin,
  getImageOrigins,
  isDevEnvironment,
} from "@/lib/productionOrigins"
import { type NextRequest, NextResponse } from "next/server"
import { generateCSP } from "./utils"

export function middleware(request: NextRequest) {
  const backendOrigin = getBackendOrigin()
  const imageOrigins = getImageOrigins()
  const isDev = isDevEnvironment()

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")
  const csp = generateCSP({
    "script-src": [
      "self",
      "unsafe-eval",
      `nonce-${nonce}`,
      "https://eu.umami.is",
      "https://hcaptcha.com",
      "https://*.hcaptcha.com",
      "https://www.clarity.ms",
    ],
    "img-src": [
      "self",
      "data:",
      "https://images.ctfassets.net",
      ...imageOrigins,
      ...(backendOrigin ? [backendOrigin] : []),
      ...(isDev ? ["http://localhost:9000", "http://localhost:4566"] : []),
    ],
    "connect-src": [
      "self",
      ...(backendOrigin ? [backendOrigin] : []),
      "https://eu.umami.is",
      "https://hcaptcha.com",
      "https://*.hcaptcha.com",
      "https://www.clarity.ms",
      ...(isDev ? ["http://localhost:*"] : []),
    ],
    "base-uri": ["self"],
    "frame-ancestors": ["self", "https://www.youtube-nocookie.com/"],
    "object-src": ["none"],
    "worker-src": ["self", "blob:", "data:"],
    ...(isDev ? {} : { "upgrade-insecure-requests": true }),
  })

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("Content-Security-Policy", csp)
  requestHeaders.set("x-nonce", nonce)

  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  res.headers.set("Content-Security-Policy", csp)

  return res
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
}
