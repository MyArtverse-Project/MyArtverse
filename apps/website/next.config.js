/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  poweredByHeader: false,
  transpilePackages: ["lodash-es"],
  experimental: {
    typedRoutes: true
  },
  rewrites: async () => [{
    source: '/profile/@:username',
    destination: '/profile/:username',
    
  }]
}

module.exports = nextConfig
