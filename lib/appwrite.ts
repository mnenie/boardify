import { Account, Client, Databases } from "appwrite";

export const client = new Client()

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('boardify-app-nuxt')

export const account = new Account(client)
export const DB = new Databases(client)