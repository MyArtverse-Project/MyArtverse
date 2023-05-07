// https://nuxt.com/docs/api/configuration/nuxt-config
let icons: { rel: string; type?: string; href: string; sizes?: string }[] = [
	{
		rel: "shortcut icon",
		type: "img/x-icon",
		href: "/favicon.ico",
	},
	{
		rel: "manifest",
		href: "/manifest.webmanifest",
	},
]

const pwaIcons = (_sizes: number[]) => {
	_sizes.forEach((size) => {
		icons.push({
			rel: "icon",
			href: `/img/icon_${size}x${size}.png`,
			sizes: `${size}x${size}`,
		})
	})
}

pwaIcons([16, 32, 48, 144, 192, 256, 384, 512])

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
			link: [...icons],
			meta: [
				{ "http-equiv": "X-UA-Compatible", content: "IE=edge" },
				{ property: "og:site_name", content: "MyFursona" },
				// !!! This is temporary, remove this when ready for production deployment
				{ name: "robots", content: "noindex,nofollow" },
				// !!! This is temporary, remove this when ready for production deployment
				{ name: "theme-color", content: "#fff" },
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
