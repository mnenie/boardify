import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import type { IUser } from "~/types/user.interface";
export default function useFirebase() {
  const { $auth, $db } = useNuxtApp();
  const onFirebaseRegistration = async (user: IUser, password: string) => {
    try {
      const creds = await createUserWithEmailAndPassword(
        $auth as Auth,
        user.email,
        password
      );
      await addDoc(collection($db as Firestore, "users"), {
        uid: creds.user.uid,
        ...user,
      });
      return creds;
    } catch (e) {
      console.log(e);
    }
  };
  const onFirebaseLogin = async (email: string, password: string) => {
    try {
      const creds = await signInWithEmailAndPassword(
        $auth as Auth,
        email,
        password
      );
      return creds;
    } catch (e) {
      console.log(e);
    }
  };

  const onFirebaseLogout = async () => {
    try {
      await signOut($auth as Auth);
    } catch (e) {
      console.log(e);
    }
  };

  const provider = new GithubAuthProvider();
  const onGitHubLogin = async () => {
    try {
      const creds = await signInWithPopup($auth as Auth, provider);
      return creds;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    onFirebaseRegistration,
    onFirebaseLogout,
    onFirebaseLogin,
    onGitHubLogin
  };
}
