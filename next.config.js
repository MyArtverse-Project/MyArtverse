/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
};

module.exports = nextConfig;

const PWASupport = require("next-pwa");

module.exports = PWASupport({
  pwa: {
    disable: process.env.NODE_ENV === 'development', // disable PWA for development, compiling takes ages
    dest: "public",
    register: true,
    skipWaiting: true,
    sw: "./public/service-worker.js",
  },
});
