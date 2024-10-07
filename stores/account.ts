import { defineStore } from "pinia";
import { type Models, ID } from "appwrite";
import AppwriteService from "~/utils/appwrite";

export const useMyAccountStore = defineStore("myAccountStore", () => {
  const appwrite = new AppwriteService();
  const current = useState(undefined);

  function get() {
    return current;
  }

  function createByEmailPassword(
    email: string,
    password: string,
    name: string,
  ): Promise<Models.User<Models.Preferences>> {
    return appwrite.account.create(ID.unique(), email, password, name);
  }

  function init(): void {
    appwrite.account
      .get()
      .then((result) => (current.value = result))
      .catch(() => console.log("Unauthenticated!"));
  }

  return {
    get,
    init,
    createByEmailPassword,
  };
});
