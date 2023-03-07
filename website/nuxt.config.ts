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
					type: "image/vnd.microsoft.icon",
					href: "/favicon.ico",
				},
				{
					rel: "manifest",
					href: "/manifest.json",
				},
			],
			meta: [
				{ "http-equiv": "X-UA-Compatible", content: "IE=edge" },
				{ property: "og:site:name", content: "MyFursona" },
				// !!! This is temporary, remove this when ready for production deployment
				{ name: "robots", content: "noindex,nofollow" },
				// !!! This is temporary, remove this when ready for production deployment
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
			baseURL:
				"https://res.cloudinary.com/kuroji-fusky-s3/image/upload/projects/myfursona/",
		},
	},
})
