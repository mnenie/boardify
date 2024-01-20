import { Client, Databases, Users } from "node-appwrite";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("boardify-app-nuxt")
    .setKey(config.appwriteKey)
  const users = new Users(client)

  const DB = new Databases(client)
  const userList = await users.list()

  return { userList };
});
