/** @type {import('next').NextConfig} */

// ! PWA package won't resolve something about webpack
// const withPWA = require("@ducanh2912/next-pwa").default({
//   dest: "public"
// })

// module.exports = withPWA({
//   experimental: {
//     typedRoutes: true
//   }
// })

const nextConfig = {
  experimental: {
    typedRoutes: true
  }
}

module.exports = nextConfig