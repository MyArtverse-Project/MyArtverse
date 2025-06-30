import nextMDX from "@next/mdx"
import nextPWA from "next-pwa"
import redirects from "./lib/redirects.js"

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["gsap", "@mav/config", "@mav/ui", "@mav/shared"],
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  experimental: {
    mdxRs: true
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/**"
      },
      {
        pathname: "https",
        hostname: "localhost.localstack.cloud",
        pathname: "/**",
        port: "4566"
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: "/@:username",
        destination: "/profile/:username"
      },
      {
        source: "/@:username/:path*",
        destination: "/profile/:username/:path*"
      }
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
            value: "no-sniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          }
        ]
      }
    ]
  }
}

const withMDX = nextMDX({
  options: {
    extension: /\.mdx?$/,
    providerImportSource: "@mdx-js/react"
  }
})

/** @type {import('next-pwa')} */
const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== "production"
})

export default () => {
  const extPlugins = [withMDX, withPWA]

  return extPlugins.reduce((acc, next) => next(acc), nextConfig)
}
