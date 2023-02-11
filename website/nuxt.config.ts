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
					href: "./favicon.ico",
				},
				{
					rel: "manifest",
					href: "./manifest.json",
				},
			],
			script: [
				{
					type: "text/javascript",
					children: `
          (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "frdjdgrmiy");
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
		optimizeCSS: true,
	},

	// @nuxt/image-edge config
	image: {},
})
