import { computed } from "vue";
import { defineStore } from "pinia";
import type { Models } from "appwrite";
import AppwriteService from "~/utils/appwrite";

export const useMySessionStore = defineStore("mySessionStore", () => {
  const appwrite = new AppwriteService();
  const sessions: globalThis.Ref<Models.Session[]> = useState();
  const current: globalThis.Ref<undefined | string> = useState(undefined);

  const isAuthenticated = computed<boolean>(() => {
    return current.value !== undefined;
  });

  function getById(id: string): undefined | Models.Session {
    return sessions.value.find((session) => session.$id === id);
  }

  function createByEmailPassword(
    email: string,
    password: string,
  ): Promise<Models.Session> {
    return appwrite.account
      .createEmailPasswordSession(email, password)
      .then((response) => {
        current.value = response.$id;
        sessions.value.push(response);
        return response;
      });
  }

  function fetchAll(): void {
    appwrite.account.listSessions().then((response) => {
      const storedSessionIds = sessions.value.map((session) => session.$id);
      response.sessions.forEach((session) => {
        if (!storedSessionIds.includes(session.$id)) {
          sessions.value.push(session);
        }
      });
      return response;
    });
  }

  function destroyById(id: string): Promise<boolean> {
    return appwrite.account.deleteSession(id).then(() => {
      const index = sessions.value.findIndex((session) => session.$id === id);
      const deleted = sessions.value.splice(index, 1);
      if (deleted.length > 0 && deleted[0].$id === current.value) {
        // logout and remove all sessions
        current.value = undefined;
        while (sessions.value.length) {
          sessions.value.pop();
        }
      }
      return true;
    });
  }

  function destroyAll(): void {
    appwrite.account.deleteSessions().then(() => {
      while (sessions.value.length) {
        sessions.value.pop();
      }
    });
  }

  function destroyCurrent() {
    return appwrite.account.deleteSession("current").then(() => {
      current.value = undefined;
      while (sessions.value && sessions.value.length > 0) {
        sessions.value.pop();
      }
      return true;
    });
  }

  function init(): Promise<boolean> {
    console.log("Fetching current session2!");
    // return appwrite.account.get()
    //   .then(response => {
    //     console.log({ user: response })
    //     return true
    //   }).catch(err => false)
    return appwrite.account
      .getSession("current")
      .then((response) => {
        current.value = response.$id;
        const exists = getById(response.$id);
        if (!exists) {
          sessions.value.push(response);
        }
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  return {
    current,
    isAuthenticated,
    init,
    getById,
    createByEmailPassword,
    destroyById,
    fetchAll,
    destroyAll,
    destroyCurrent,
  };
});
