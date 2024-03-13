export default defineNuxtConfig({
  devtools: { enabled: false },
  //seo
  app: {
    head: {
      title: 'Boardify',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, shrink-to-fit=no'
        },
        {
          name: 'title',
          content: 'Boardify - virtual whiteboard for your own and collaborative solutions.'
        },
        {
          name: 'description',
          content:
            'Boardify is a virtual whiteboard that lets you easy to express your thoughts in the form of drawings'
        },
        { name: 'keywords', content: 'Boardify, Whiteboard, Draw, Collaborative' },

        //open graph
        { property: 'og:site:name', content: 'Boardify' },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content: 'Boardify - virtual whiteboard for your own and collaborative solutions.'
        },
        {
          property: 'og:description',
          content:
            'Boardify is a virtual whiteboard that lets you easy to express your thoughts in the form of drawings'
        },
        { property: 'og:image', content: './public/about/boardify.png' }
      ]
    }
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@formkit/auto-animate/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts'
  ],
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui'
  },
  pinia: {
    storesDirs: ['./store/**']
  },
  runtimeConfig: {
    firebaseApi: process.env.FIREBASE_API_KEY,

    public: {
      firebaseApi: process.env.FIREBASE_API_KEY
    }
  },
});
