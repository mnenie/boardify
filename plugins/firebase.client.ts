import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: config.public.firebaseApi,
        authDomain: "boardify-dbb3a.firebaseapp.com",
        projectId: "boardify-dbb3a",
        storageBucket: "boardify-dbb3a.appspot.com",
        messagingSenderId: "524164992803",
        appId: "1:524164992803:web:16125b8a96af8f9fa1c696"
    }

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const db = getFirestore(app)

    nuxtApp.vueApp.provide('auth', auth)
    nuxtApp.provide('auth', auth)
    nuxtApp.vueApp.provide('db', db)
    nuxtApp.provide('db', db)
})