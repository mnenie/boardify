export default defineNuxtRouteMiddleware((to) => {
  if (!useCookie("uid").value) {
    abortNavigation();
    return navigateTo(LOGIN_ROUTE);
  }
});
