/* eslint-disable @typescript-eslint/no-var-requires */
const withMDX = require("@next/mdx")({
  options: {
    extension: /\.mdx?$/,
    providerImportSource: "@mdx-js/react"
  }
})

/** @type {import('next-pwa')} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== "production"
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lodash-es", "gsap", "@myfursona/biro-ui"],
  swcMinify: true,
  poweredByHeader: false,
  experimental: {
    mdxRs: true
  },
  typescript: {
    ignoreBuildErrors: true
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
    return [
      { source: "/signup", destination: "/register", permanent: true },
      { source: "/sign-up", destination: "/register", permanent: true },
      { source: "/signin", destination: "/login", permanent: true },
      { source: "/sign-in", destination: "/login", permanent: true },
      { source: "/dashboard", destination: "/dashboard/overview", permanent: true },
      // TODO: change dest. route to /settings/profile soon
      { source: "/settings", destination: "/settings/account", permanent: true }
    ]
  }
}

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  ...withPWA(nextConfig)
})
