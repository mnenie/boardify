import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import type { IUser } from "~/types/user.interface";
export default function useFirebase() {
  const { $auth, $db } = useNuxtApp();
  const { data } = useUsersQuery();

  const onFirebaseRegistration = async (user: IUser, password: string) => {
    try {
      const creds = await createUserWithEmailAndPassword(
        $auth as Auth,
        user.email,
        password
      );
      const userExists = data.value?.some(
        (user) => user.uid === creds.user.uid
      );
      if (!userExists) {
        await addDoc(collection($db as Firestore, "users"), {
          uid: creds.user.uid,
          ...user,
        });
      }
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
      const userExists = data.value?.some(
        (user) => user.uid === creds.user.uid
      );
      if (!userExists) {
        await addDoc(collection($db as Firestore, "users"), {
          uid: creds.user.uid,
          name: creds.user.displayName,
          email: creds.user.email,
          photo: creds.user.photoURL,
        });
      }
      return creds;
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged($auth as Auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          reject(null);
        }
      });
    });
  };

  return {
    onFirebaseRegistration,
    onFirebaseLogout,
    onFirebaseLogin,
    onGitHubLogin,
    getCurrentUser,
  };
}
