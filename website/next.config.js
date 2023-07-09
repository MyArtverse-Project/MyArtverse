/** @type {import('next').NextConfig} */
// const withPWA = require("next-pwa")({
//   dest: "public",
//   disable: process.env.NODE_ENV === "development"
// })

const nextConfig = {
  experimental: {
    typedRoutes: true
  }
}

// module.exports = withPWA({
//   ...nextConfig
// })

module.exports = nextConfig
