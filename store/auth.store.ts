import useFirebase from "~/composables/useFirebase";
import type { IUser } from "~/types/user.interface";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({} as IUser);
  const router = useRouter();
  const token = ref("");

  const {
    onFirebaseRegistration,
    onFirebaseLogout,
    onFirebaseLogin,
    onGitHubLogin,
    getCurrentUser
  } = useFirebase();

  const login = async (email: string, password: string) => {
    try {
      const response = await onFirebaseLogin(email, password);
      //@ts-ignore
      token.value = response?.user.accessToken;
      sessionStorage.setItem("token", token.value);
      await router.push(HOME_ROUTE);
    } catch (err) {
      console.log(err);
    }
  };
  const registration = async (userData: IUser, password: string) => {
    try {
      const response = await onFirebaseRegistration(userData, password);
      user.value = { ...userData, id: response?.user.uid! };
      //@ts-ignore
      token.value = response?.user.accessToken;
      sessionStorage.setItem("token", token.value);
      await router.push(HOME_ROUTE);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await onFirebaseLogout();
      user.value = {} as IUser;
      token.value = "";
      sessionStorage.removeItem("token");
      await router.push(LOGIN_ROUTE);
    } catch (e) {
      console.log(e);
    }
  };

  const gitHubSession = async () => {
    try {
      const response = await onGitHubLogin();
      user.value = {
        id: response?.user.uid!,
        email: response?.user.email!,
        name: response?.user.displayName!,
        photoUrl: response?.user.photoURL!,
      };
      //@ts-ignore
      token.value = response?.user.accessToken;
      await router.push(HOME_ROUTE);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    user,
    registration,
    logout,
    login,
    gitHubSession,
  };
});
