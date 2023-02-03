// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          href: ",/favicon.ico",
        },
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
  // @ts-ignore
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
  typescript: {
    shim: false,
    strict: true,
  },
  // @nuxt/image-edge config
  image: {
    cloudinary: {
      baseURL: "https://res.cloudinary.com/kuroji-fusky-s3/image/upload/",
    },
  },
})
