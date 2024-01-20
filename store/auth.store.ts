import { account } from "~/lib/appwrite";
import type { IUser } from "~/types/user.interface";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({} as IUser);
  const isLogin = ref<boolean>(false)
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailSession(email, password);
      const response = await account.get();
      if (response) {
        user.value = {
          email: response.email,
          name: response.name,
          status: response.status,
        };
        isLogin.value = true
        await router.push(HOME_ROUTE)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const registration = async (
    userId: any,
    email: string,
    password: string,
    name: string
  ) => {
    await account.create(userId, email, password, name);
    login(email, password);
  };

  const logout = async () => {
    await account.deleteSession("current");
    user.value = {} as IUser;
    isLogin.value = false
    await router.push(LOGIN_ROUTE)
  };

  const getAccount = async () => {
    try {
      const currentUser = await account.get()
      if (currentUser) {
        user.value = {
          id: currentUser.$id,
          name: currentUser.name,
          email: currentUser.email,
          status: currentUser.status,
        } as IUser;
        isLogin.value = true;
      }
    } catch (e) {
      console.log(e);
      await router.push(LOGIN_ROUTE)
    }
  }

  return {
    user,
    registration,
    logout,
    login,
    isLogin,
    getAccount
  };
});
