export default defineNuxtRouteMiddleware(async (to) => {
  if (useCookie("token").value) {
    return navigateTo(HOME_ROUTE);
  }
});
