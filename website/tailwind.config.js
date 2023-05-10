const pluginBaseStyles = require("tailwindcss/plugin")
const defaultTheme = require("tailwindcss/defaultTheme")

const lightTheme = {
	"--light--background": "hsla(252, 100%, 99%, 1)",
	"--light--bg-mute": "hsla(261, 34%, 83%, 1)",
	"--light--bg-modal": "hsla(260, 100%, 91%, 1)",
	"--light--button-idle-chips": "hsla(260, 88%, 83%, 1)",
	"--light--active-state": "hsla(266, 100%, 40%, 1)",

	"--light--text-field": "hsla(260, 100%, 77%, 1)",

	"--light--icon-emphasis": "hsla(259, 90%, 25%, 1)",
	"--light--text-emphasis": "hsla(260, 81%, 16%, 1)",
	"--light--text-icons": "hsla(258, 79%, 5%, 1)",
	"--light--subtext": "hsla(263, 79%, 5%, 0.75)",

	"--light--separator": "hsla(256, 27%, 59%, 1)",

	"--light--bg-warning": "hsla(47, 100%, 87%, 1)",
	"--light--bg-info": "hsla(212, 100%, 87%, 1)",
	"--light--bg-error": "hsla(0, 100%, 87%, 1)",
}

const darkTheme = {
	"--dark--background": "hsla(260, 75%, 3%, 1)",
	"--dark--bg-mute": "hsla(252, 27%, 18%, 1)",
	"--dark--bg-modal": "hsla(259, 86%, 11%, 1)",
	"--dark--button-idle-chips": "hsla(259, 82%, 18%, 1)",
	"--dark--active-state": "hsla(267, 100%, 50%, 1)",

	"--dark--text-field": "hsla(256, 66%, 34%, 1)",

	"--dark--text-emphasis": "hsla(248, 100%, 85%, 1)",
	"--dark--text-icons": "hsla(258, 100%, 97%, 1)",
	"--dark--subtext": "hsla(261, 42%, 86%, 0.75)",

	"--dark--separator": "hsla(246, 27%, 42%, 1)",

	"--dark--bg-error": "hsla(0, 100%, 15%, 1)",
	"--dark--bg-warning": "hsla(47, 100%, 15%, 1)",
	"--dark--bg-info": "hsla(212, 100%, 15%, 1)",
}

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
				":root": {
					...lightTheme,
					...darkTheme,
				},
			})
		}),
	],
	theme: {
		extend: {
			colors: {
				success: "hsl(137, 88%, 40%)",
				error: "hsl(0, 100%, 61%)",
				warning: "hsl(47, 94%, 47%)",
				info: "hsl(212, 95%, 46%)",
				hyperlink: "hsl(220, 100%, 50%)",
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
