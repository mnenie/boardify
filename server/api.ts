import { Client, Databases } from "node-appwrite";

export default defineEventHandler(event => {
  const config = useRuntimeConfig()

  const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject('boardify-app-nuxt').setKey(config.appwriteKey)

  const DB = new Databases(client)

  return {
    DB
  }
})