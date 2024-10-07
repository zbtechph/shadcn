export default defineNuxtRouteMiddleware((to) => {
  const sessionStore = useMySessionStore();
  const target = to.path;

  if (!sessionStore.isAuthenticated) {
    return navigateTo({
      path: "/login",
      query: {
        redirect: target,
      },
    });
  }
});
