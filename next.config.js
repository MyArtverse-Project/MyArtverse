/** @type {import('next').NextConfig} */
module.exports = async (phase) => {
	const withPlugins = require("next-compose-plugins")

	const runtimeCaching = require("next-pwa/cache")
	runtimeCaching[0].handler = "StaleWhileRevalidate"

	const withPWA = require("next-pwa")({
		disable: process.env.NODE_ENV === 'development', // disable PWA for development, compiling takes ages
		dest: "public",
		register: true,
		skipWaiting: true,
		sw: "./public/service-worker.js",
	})

	const nextConfig = {
		reactStrictMode: true,
		compress: true,
		swcMinify: true,
	}

	const defaultConfig = {}

	return withPlugins([withPWA], nextConfig)(phase, { defaultConfig })
}