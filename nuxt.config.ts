// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true }, 
  modules: ['@pinia/nuxt','@nuxtjs/tailwindcss', 'shadcn-nuxt', '@formkit/auto-animate/nuxt', '@nuxt/image'],
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui'
  },
  pinia: {
    storesDirs: ['./store/**'],
  },
  runtimeConfig:{
    public: {
      appwriteKey: process.env.NUXT_APPWRITE_KEY
    }
  }
})

