import type { RouteLocationNormalizedGeneric } from "vue-router";

export const useGuest = () => {
  function redirectIfAuthenticated(
    to: RouteLocationNormalizedGeneric | undefined = undefined,
  ) {
    if (to === undefined) {
      const route = useRoute();
      to = route;
    }
    const target = <string>to.query.redirect ?? "/";
    const sessionStore = useMySessionStore();
    if (sessionStore.isAuthenticated) {
      return navigateTo(target);
    }
  }

  function redirectToTarget(target: string | undefined = undefined) {
    if (target === undefined) {
      const route = useRoute();
      target = <string>route.query.redirect ?? "/";
    }
    return navigateTo(target);
  }

  return { redirectIfAuthenticated, redirectToTarget };
};
