/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

module.exports = nextConfig;

const PWASupport = require("next-pwa");

module.exports = PWASupport({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
