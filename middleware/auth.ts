export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  const user = authStore.isLogin

  if(user){
    return navigateTo(LOGIN_ROUTE)
  }
})