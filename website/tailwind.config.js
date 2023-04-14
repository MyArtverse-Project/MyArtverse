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
					minHeight: "100vh",
				},
			})
		}),
	],
	theme: {
		extend: {
			fontFamily: {
				inter: ["Inter", ...defaultTheme.fontFamily.sans],
				"open-sans": ["Open Sans", ...defaultTheme.fontFamily.sans],
			},
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
				red: {
					DEFAULT: "#E94E4E",
					50: "#FFFDFD",
					100: "#FCE4E4",
					200: "#F5B2B2",
					300: "#EF8080",
					400: "#E94E4E",
					500: "#E42121",
					600: "#BA1718",
					700: "#8D1113",
					800: "#5F0C0D",
					900: "#320607",
				},
				orange: {
					DEFAULT: "#E5740B",
					50: "#FCE2C9",
					100: "#FBD2AC",
					200: "#F8B272",
					300: "#F69337",
					400: "#E5740B",
					500: "#BE6109",
					600: "#974E07",
					700: "#703A05",
					800: "#492603",
					900: "#221202",
				},
				lime: {
					DEFAULT: "#E0BC0B",
					50: "#FCF2C5",
					100: "#FBEBA7",
					200: "#F8DF6D",
					300: "#F5D432",
					400: "#E0BC0B",
					500: "#B99D09",
					600: "#927D07",
					700: "#6B5C05",
					800: "#443B03",
					900: "#1D1A01",
				},
				pink: {
					DEFAULT: "#E36DA6",
					50: "#FAE5F0",
					100: "#F7D4E6",
					200: "#F0B2D2",
					300: "#EA90BC",
					400: "#E36DA6",
					500: "#DA3E88",
					600: "#BC246A",
					700: "#8D1B4E",
					800: "#5E1233",
					900: "#2F0919",
				},
			},
		},
	},
}
