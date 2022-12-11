/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins")
const runtimeCaching = require("next-pwa/cache")

module.exports = async (phase) => {
	runtimeCaching[0].handler = "StaleWhileRevalidate"

	const withPWA = require("next-pwa")({
		disable: process.env.NODE_ENV === 'development', // Disable PWA for development
		dest: "public",
		register: true,
		skipWaiting: true,
		sw: "./service-worker.js",
	})

	const nextConfig = {
		reactStrictMode: true,
		compress: true,
		swcMinify: true,
	}

	const defaultConfig = {}

	return withPlugins([withPWA], nextConfig)(phase, { defaultConfig })
}