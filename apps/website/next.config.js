const shared = require("@myfursona-internal/config/next-config-shared")

const withMDX = require("@next/mdx")({
  options: {
    extension: /\.mdx?$/,
    providerImportSource: "@mdx-js/react"
  }
})

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...shared,
  transpilePackages: ["lodash"],
  // async rewrites() {
  //   return [
  //     {
  //       source: "/@:username",
  //       destination: "/profile/:username"
  //     },
  //     {
  //       source: "/@:username/:path*",
  //       destination: "/profile/:username/:path*"
  //     }
  //   ]
  // },
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
