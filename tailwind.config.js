/** @type {import('tailwindcss').Config} */
const pluginBaseStyles = require("tailwindcss/plugin");

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
					fontFamily: theme("fontFamily.open-sans")
				}
      });
    }),
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
        "open-sans": ["Open Sans"],
      },
    },
  },
};
