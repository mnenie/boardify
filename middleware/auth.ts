export default defineNuxtRouteMiddleware((to) => {
  if (!useCookie("token").value) {
    abortNavigation();
    return navigateTo(LOGIN_ROUTE);
  }
});
