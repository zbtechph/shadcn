export const useGuestWatcher = () => {
  const sessionStore = useMySessionStore();
  function subscribe() {
    sessionStore.$subscribe(
      (mutation, state) => {
        if (mutation.storeId === "mySessionStore") {
          if (state.current !== undefined) {
            const { redirectToTarget } = useGuest();
            redirectToTarget();
          }
        }
      },
      {
        detached: true,
      },
    );
  }

  return {
    subscribe,
  };
};
