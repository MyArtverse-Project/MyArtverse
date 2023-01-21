// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/color-mode",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
      },
    ],
  ],
  css: [
    "@fontsource/inter/400.css",
    "@fontsource/inter/600.css",
    "@fontsource/inter/700.css",
    "@fontsource/inter/800.css",
    "@fontsource/inter/900.css",
    "@fontsource/open-sans/400.css",
    "@fontsource/open-sans/400-italic.css",
    "@fontsource/open-sans/600.css",
    "@fontsource/open-sans/600-italic.css",
    "@fontsource/open-sans/800.css",
    "@fontsource/open-sans/800-italic.css",
    "~/assets/css/main.scss",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    shim: false,
    strict: true,
  },
  app: {
    head: {
      link: [
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
})
