import { account } from "~/lib/appwrite";
import type { IUser } from "~/types/user.interface";
const authStore = useAuthStore();
export default function useGetAccount() {
  const getAccount = async () => {
    try {
      const currentUser = await account.get();
      if (currentUser) {
        authStore.user = {
          id: currentUser.$id,
          name: currentUser.name,
          email: currentUser.email,
          status: currentUser.status,
        } as IUser;
        authStore.isLogin = true;
        console.log(authStore.user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    getAccount
  }
}
