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
  }
});
