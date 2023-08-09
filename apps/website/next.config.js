/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  poweredByHeader: false,
  transpilePackages: ["lodash"],
  experimental: {
    typedRoutes: true
  }
}

module.exports = nextConfig
