import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { generateCSPString } from "./utils"

export default function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const generatedNonce = crypto.randomUUID()

  const csp = generateCSPString({
    defaultSrc: {},
    scriptSrc: {
      // TODO only enable 'unsafe-eval' on dev environments only
      unsafeEval: true,
      domains: [
        "https://assets.hcaptcha.com",
        "https://www.clarity.ms/",
        "https://analytics.umami.is/"
      ],
      nonce: generatedNonce
    },
    styleSrc: {
      unsafeInline: true
    },
    connectSrc: {
      domains: [
        "https://assets.hcaptcha.com",
        "https://api.stripe.com",
        "https://analytics.umami.is/"
      ]
    },
    frameSrc: {
      domains: [
        "https://www.youtube-nocookie.com",
        "https://hooks.stripe.com",
        "https://js.stripe.com"
      ]
    },
    imgSrc: {
      domains: ["https://c.bing.com", "https://c.clarity.ms"]
    },
    upgradeInsecureRequests: true
  })

  // Set the CSP header so that Next.js can read it and generate tags with the nonce
  requestHeaders.set("Content-Security-Policy", csp)
  requestHeaders.set("x-nonce", generatedNonce)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })

  response.headers.set("Content-Encoding", "br")
  response.headers.set("Content-Security-Policy", csp)
  response.headers.set("X-Content-Type-Options", "no-sniff")
  response.headers.set("X-Frame-Options", "DENY")
  /**
   ** Technically not supported by most browsers as it's a non-standard, but it's here
   ** just for good measure.
   **/
  response.headers.set("X-XSS-Protection", "1; mode=block")

  return response
}
