// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxt/image-edge",
		"@nuxtjs/color-mode",
		"@nuxtjs/apollo",
		[
			"@pinia/nuxt",
			{
				autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
			},
		],
	],
	apollo: {
		clients: {
			default: {
				httpEndpoint: "http://localhost:8080/graphql",
			},
		},
	},
	app: {
		head: {
			htmlAttrs: {
				lang: "en",
			},
			link: [
				{
					rel: "shortcut icon",
					href: "./favicon.ico",
				},
				{
					rel: "manifest",
					href: "./manifest.json",
					crossorigin: "use-credentials",
				},
			],
		},
	},
	build: {
		transpile: ["gsap"],
	},
	css: ["~/assets/css/main.scss"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	webpack: {
		optimizeCSS: true,
	},

	// @nuxt/image-edge config
	image: {},
})
