const SITE_URL = "https://my-little-vendors.vercel.app";
const SITE_NAME = "My Little Vendors";
const OG_IMAGE = `${SITE_URL}/images/preview/thumbnail.png`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  ssr: true,

  app: {
    head: {
      htmlAttrs: { lang: "ko" },
      titleTemplate: `%s | ${SITE_NAME}`,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#fbbf24" },
        { name: "robots", content: "index, follow" },
        {
          name: "keywords",
          content:
            "vancouver small business, vancouver korean business, 밴쿠버 소상공인, 밴쿠버 한인 비즈니스, home business vancouver, local vendors vancouver, 밴쿠버 홈비즈니스, BC small business directory",
        },
        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:url", content: SITE_URL },
        {
          property: "og:title",
          content: `${SITE_NAME} — Vancouver Local & Home Business Directory`,
        },
        {
          property: "og:description",
          content:
            "Discover and support local small businesses and home vendors in Vancouver. 밴쿠버 한인 소상공인과 홈비즈니스를 찾고 응원하세요.",
        },
        { property: "og:image", content: OG_IMAGE },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:width", content: "1536" },
        { property: "og:image:height", content: "1024" },
        {
          property: "og:image:alt",
          content: "My Little Vendors — Vancouver local business directory",
        },
        { property: "og:locale", content: "ko_KR" },
        { property: "og:locale:alternate", content: "en_CA" },
        // Twitter / X
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@mylittlevendors" },
        {
          name: "twitter:title",
          content: `${SITE_NAME} — Vancouver Local & Home Business Directory`,
        },
        {
          name: "twitter:description",
          content:
            "Discover and support local small businesses and home vendors in Vancouver. 밴쿠버 한인 소상공인과 홈비즈니스를 찾고 응원하세요.",
        },
        { name: "twitter:image", content: OG_IMAGE },
        {
          name: "twitter:image:alt",
          content: "My Little Vendors — Vancouver local business directory",
        },
        // Geo / local SEO
        { name: "geo.region", content: "CA-BC" },
        { name: "geo.placename", content: "Vancouver, British Columbia" },
        { name: "geo.position", content: "49.2827;-123.1207" },
        { name: "ICBM", content: "49.2827, -123.1207" },
      ],
      link: [{ rel: "canonical", href: SITE_URL }],
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

  modules: ["@nuxtjs/tailwindcss", "nuxt-auth-utils"],

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
  },
});
