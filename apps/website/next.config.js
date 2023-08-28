/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  poweredByHeader: false,
  transpilePackages: ["lodash-es"],
  experimental: {
    typedRoutes: true
  }
}

module.exports = nextConfig
