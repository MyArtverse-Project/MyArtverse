const shared = require("@myfursona-internal/config/next-config-shared")

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...shared,
  output: "export",
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
