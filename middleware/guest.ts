export default defineNuxtRouteMiddleware((to) => {
  const { redirectIfAuthenticated } = useGuest();

  return redirectIfAuthenticated(to);
});
