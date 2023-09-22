import { NextResponse } from "next/server"
import { generateCSP } from "./utils/generateCSP"

export default function middleware() {
  const generatedNonce = Buffer.from(crypto.randomUUID()).toString("base64")

  const csp = generateCSP({
    "default-src": ["self"],
    "script-src": [
      "self",
      "unsafe-eval",
      "strict-dynamic",
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
    "img-src": [
      "self",
      "data:",
      "https:",
      "images.ctfassets.net",
      "c.bing.com",
      "c.clarity.ms"
    ],
    "upgrade-insecure-requests": true
  })

  const requestHeaders = new Headers()

  requestHeaders.set("Content-Encoding", "br")
  requestHeaders.set("Content-Security-Policy", csp)
  requestHeaders.set("x-nonce", generatedNonce)

  const response = NextResponse.next({
    headers: requestHeaders
  })

  return response
}
