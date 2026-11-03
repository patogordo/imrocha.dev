// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-09-27",
  ssr: false,
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
        { rel: "icon", sizes: "48x48", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
      meta: [{ name: "theme-color", content: "#22272e" }],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/fonts",
    "@nuxt/image",
    "@formkit/auto-animate/nuxt",
    "@nuxt/content",
  ],
  // node:sqlite (Node 22.5+) instead of installing better-sqlite3
  content: {
    experimental: { sqliteConnector: "native" },
    build: {
      markdown: {
        // Same palette as the site (base-100/200/300 come from GitHub Dark Dimmed)
        highlight: {
          theme: "github-dark-dimmed",
          langs: ["ts", "js", "json", "bash", "vue", "dockerfile", "yaml"],
        },
      },
    },
  },
  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 512,
    },
  },
  tailwindcss: {
    cssPath: ["~/assets/scss/tailwind.scss", { injectPosition: "first" }],
    configPath: "./tailwind.config.js",
    viewer: false,
  },
  fonts: {
    families: [
      { name: "Inter", provider: "google" },
      { name: "Russo One", provider: "google" },
      { name: "JetBrains Mono", provider: "google" },
    ],
  },
  i18n: {
    strategy: "no_prefix",
    detectBrowserLanguage: {
      fallbackLocale: "en",
    },
    langDir: "locales",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "pt",
        name: "Português",
        file: "pt.json",
      },
    ],
    vueI18n: "config.ts",
  },
});
