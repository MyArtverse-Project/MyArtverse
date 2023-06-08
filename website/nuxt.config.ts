// https://nuxt.com/docs/api/configuration/nuxt-config
let icons: { rel: string; type?: string; href: string; sizes?: string }[] = [
	{
		rel: "shortcut icon",
		type: "image/x-icon",
		href: "/favicon.ico",
	},
	{
		rel: "manifest",
		href: "/manifest.webmanifest",
	},
]

const pwaIcons = (sizesArr: number[]) => {
	sizesArr.forEach((size) => {
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
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1.0" },
				{ "http-equiv": "X-UA-Compatible", content: "IE=edge" },
				{ property: "og:site_name", content: "MyFursona" },
				// !!! This is temporary, remove this when ready for production deployment
				{ name: "robots", content: "noindex,nofollow" },
				// !!! This is temporary, remove this when ready for production deployment
				{ name: "theme-color", content: "#fff" },
			],
			link: [...icons],
			script: [
				{ src: "https://cdn.onesignal.com/sdks/OneSignalSDK.js", defer: true },
				{
					innerHTML: `
            window.OneSignal=window.OneSignal||[];
            OneSignal.push(() => {
              OneSignal.init({
                appId: "REDACTED",
                safari_web_id: "REDACTED",
              })
            })
        `,
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
		extractCSS: true,
	},

	// @nuxt/image-edge config
	image: {
		cloudinary: {
			baseURL:
				"https://res.cloudinary.com/kuroji-fusky-s3/image/upload/projects/myfursona/",
		},
	},
})
