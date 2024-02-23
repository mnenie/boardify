import type { User } from "firebase/auth";
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
      const uid = useCookie('uid');
      uid.value = response?.user?.uid
      if(token.value){
        await router.push(HOME_ROUTE);
      }
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
      const uid = useCookie('uid');
      uid.value = response?.user?.uid
      if(token.value){
        await router.push(HOME_ROUTE);
      }
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
      const uid = useCookie('uid');
      uid.value = null
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
      sessionStorage.setItem("token", token.value);
      const uid = useCookie('uid');
      uid.value = response?.user?.uid
      if(token.value){
        await router.push(HOME_ROUTE);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentSessionUser = async () => {
    try{
      const response = await getCurrentUser() as User
      user.value = {id: response.uid, email: response.email!, name: response.displayName!, photoUrl: response.photoURL!}
    }
    catch(err){
      console.log(err)
    }
  }

  return {
    user,
    registration,
    logout,
    login,
    gitHubSession,
    getCurrentSessionUser
  };
});
