const withMDX = require("@next/mdx")()
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  poweredByHeader: false,
  transpilePackages: ["lodash"],
  experimental: {
    typedRoutes: true,
    mdxRs: true
  },
  async rewrites() {
    return [
      {
        source: "/profile/@:username",
        destination: "/profile/:username"
      },
      {
        source: "/profile/@:username/:path*",
        destination: "/profile/:username/:path*"
      }
    ]
  },
  async redirects() {
    return [
      { source: "/signup", destination: "/register", permanent: true },
      { source: "/signin", destination: "/login", permanent: true },
      {
        source: "/profile/@create",
        destination: "/profile/create",
        permanent: true
      }
    ]
  }
}

module.exports = withMDX(withPWA(nextConfig))
