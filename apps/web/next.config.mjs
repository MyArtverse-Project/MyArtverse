import nextMDX from "@next/mdx"
import nextPWA from "next-pwa"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { buildImageRemotePatterns } from "./lib/productionOrigins.mjs"
import redirects from "./lib/redirects.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["gsap", "@mav/config", "@mav/shared"],
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  outputFileTracingRoot: path.join(__dirname, "../../"),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    mdxRs: true,
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
  disable: process.env.NODE_ENV !== "production",
})

export default () => {
  const extPlugins = [withMDX, withPWA]

  return extPlugins.reduce((acc, next) => next(acc), nextConfig)
}
