// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // Static site generation for GitHub Pages
  ssr: true,
  nitro: {
    preset: "github-pages",
  },

  // TODO: Set baseURL to your repo name when deploying to GitHub Pages
  // e.g. app: { baseURL: '/my_little_vendors/' }
  // app: { baseURL: '/my_little_vendors/' },

  modules: ["@nuxtjs/tailwindcss"],

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
  },
});
