import nextMDX from "@next/mdx"
import { withSentryConfig } from "@sentry/nextjs"
import nextPWA from "next-pwa"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { buildImageRemotePatterns } from "./lib/productionOrigins.mjs"
import redirects from "./lib/redirects.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const monorepoRoot = path.join(__dirname, "../../")

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["gsap", "@mav/config", "@mav/shared"],
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  outputFileTracingRoot: monorepoRoot,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    mdxRs: true,
    serverActions: {
      bodySizeLimit: "10mb",
    },
    outputFileTracingIncludes: {
      "/*": [
        "../../packages/shared/**/*",
        "../../packages/config/**/*",
      ],
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    remotePatterns: buildImageRemotePatterns(),
  },
  async rewrites() {
    return [
      {
        source: "/@:username",
        destination: "/profile/:username",
      },
      {
        source: "/@:username/:path*",
        destination: "/profile/:username/:path*",
      },
    ]
  },
  async redirects() {
    return redirects
  },
  async headers() {
    return [
      {
        source: "/(.*?)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "no-sniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ]
  },
}

const withMDX = nextMDX({
  options: {
    extension: /\.mdx?$/,
    providerImportSource: "@mdx-js/react",
  },
})

/** @type {import('next-pwa')} */
const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  // next-pwa can break Vercel serverless trace/deploy; keep PWA off on Vercel
  disable: process.env.VERCEL === "1" || process.env.NODE_ENV !== "production",
})

function buildNextConfig() {
  const extPlugins = [withMDX, withPWA]
  return extPlugins.reduce((acc, next) => next(acc), nextConfig)
}

const sentryBuildOptions = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  disableSourceMapUpload: !process.env.SENTRY_AUTH_TOKEN,
  // Route browser events through the app to reduce ad-blocker drops
  tunnelRoute: "/monitoring",
  widenClientFileUpload: true,
  hideSourceMaps: true,
}

export default withSentryConfig(buildNextConfig(), sentryBuildOptions)
