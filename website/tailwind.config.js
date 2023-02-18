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
		pluginBaseStyles(({ addBase, theme }) => {
			addBase({
				html: {
					scrollBehavior: "smooth",
					overflowX: "hidden",
					"@media (prefers-reduced-motion)": {
						scrollBehavior: "auto",
					},
				},
				body: {
					fontFamily: theme("fontFamily.open-sans"),
				},
        "#__nuxt": {
          minHeight: '100vh',
        }
			})
		}),
	],
	theme: {
		extend: {
			fontFamily: {
				inter: ["Inter", ...defaultTheme.fontFamily.sans],
				"open-sans": ["Open Sans", ...defaultTheme.fontFamily.sans],
			},
		},
	},
}
