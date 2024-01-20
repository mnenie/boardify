import { account } from "~/lib/appwrite"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await account.get()
  if(!user){
    return navigateTo(LOGIN_ROUTE)
  }
})