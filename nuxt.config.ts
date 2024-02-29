export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@formkit/auto-animate/nuxt",
    "@nuxt/image",
    '@vueuse/nuxt',
  ],
  shadcn: {
    prefix: "Ui",
    componentDir: "./components/ui",
  },
  pinia: {
    storesDirs: ["./store/**"],
  },
  runtimeConfig: {
    firebaseApi: process.env.FIREBASE_API_KEY,
    public: {
      firebaseApi: process.env.FIREBASE_API_KEY
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, shrink-to-fit=no',
    }
  }
});
