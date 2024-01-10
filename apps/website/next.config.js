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
    typedRoutes: true,
    mdxRs: true
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment"
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
      { source: "/sign-in", destination: "/login", permanent: true }
    ]
  }
}

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  ...withPWA(nextConfig)
})
