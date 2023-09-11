/** @type {import('next').NextConfig} */
const withMDX = require("@next/mdx")()

const nextConfig = {
  swcMinify: true,
  poweredByHeader: false,
  transpilePackages: ["lodash-es"],
  experimental: {
    typedRoutes: true,
    mdxRs: true
  },
  rewrites: async () => [
    {
      source: "/profile/@:username",
      destination: "/profile/:username"
    }
  ]
}

module.exports = withMDX(nextConfig)
