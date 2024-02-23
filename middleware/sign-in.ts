export default defineNuxtRouteMiddleware(async (to) => {
  if (useCookie("uid").value) {
    return navigateTo(HOME_ROUTE);
  }
});
