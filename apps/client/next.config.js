const shared = require("@myfursona-internal/config/next-config-shared")

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...shared,
  output: "export"
}

module.exports = nextConfig
