const pluginBaseStyles = require("tailwindcss/plugin")
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
		"./app.vue",
	],
	plugins: [
		require("@tailwindcss/typography"),
		pluginBaseStyles(({ addBase, theme }) => {
			addBase({
				html: {
					overflowX: "hidden",
					scrollBehavior: "smooth",
					"@media (prefers-reduced-motion)": {
						scrollBehavior: "auto",
					},
				},
				body: {
					fontFamily: theme("fontFamily.open-sans"),
				},
				"#__nuxt": {
					minHeight: "100vh",
				},
			})
		}),
	],
	theme: {
		extend: {
			colors: {
				base: {
					DEFAULT: "#634E97",
					50: "#FCFBFD",
					100: "#EBE7F3",
					200: "#C9BFDE",
					300: "#A696C9",
					400: "#836EB4",
					500: "#634E97",
					600: "#4D3D75",
					700: "#362B54",
					800: "#201A32",
					900: "#0B0911",
				},
			},
			fontFamily: {
				inter: ["Inter", ...defaultTheme.fontFamily.sans],
				"open-sans": ["Open Sans", ...defaultTheme.fontFamily.sans],
			},
			inset: {
				unset: "unset",
			},
			spacing: {
				unset: "unset",
			},
		},
	},
}
