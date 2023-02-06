// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxt/image-edge",
		"@nuxtjs/color-mode",
		[
			"@pinia/nuxt",
			{
				autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
			},
		],
	],
	app: {
		head: {
			link: [
				{
					rel: "shortcut icon",
					href: ",/favicon.ico",
				},
				{
					rel: "manifest",
					href: "./manifest.json",
				},
				{
					rel: "stylesheet",
					href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css",
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
	image: {
		cloudinary: {
			baseURL: "https://res.cloudinary.com/kuroji-fusky-s3/image/upload/",
		},
	},
})
