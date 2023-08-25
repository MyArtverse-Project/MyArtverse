/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: true
  },
}

module.exports = nextConfig
