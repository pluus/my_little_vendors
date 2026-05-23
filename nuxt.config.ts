// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  ssr: true,

  app: {
    head: {
      meta: [
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://my-little-vendors.vercel.app/",
        },
        { property: "og:title", content: "My Little Vendors" },
        {
          property: "og:description",
          content: "밴쿠버 한인 소상공인 디렉토리",
        },
        {
          property: "og:image",
          content:
            "https://my-little-vendors.vercel.app/images/preview/thumbnail.png",
        },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:width", content: "1536" },
        { property: "og:image:height", content: "1024" },
        {
          property: "og:image:secure_url",
          content:
            "https://my-little-vendors.vercel.app/images/preview/thumbnail.png",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "My Little Vendors" },
        {
          name: "twitter:description",
          content: "밴쿠버 한인 소상공인 디렉토리",
        },
        {
          name: "twitter:image",
          content:
            "https://my-little-vendors.vercel.app/images/preview/thumbnail.png",
        },
      ],
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-BCEGFB9CDG",
          async: true,
        },
        {
          innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-BCEGFB9CDG');`,
        },
      ],
    },
  },

  modules: ["@nuxtjs/tailwindcss"],

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
  },
});
