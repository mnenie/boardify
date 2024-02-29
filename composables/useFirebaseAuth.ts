import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged
} from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';

export default function useFirebase() {
  const { $auth, $db } = useNuxtApp();
  const { data } = useUsersQuery();

  const onFirebaseRegistration = async (email: string, password: string) => {
    const creds = await createUserWithEmailAndPassword($auth as Auth, email, password);
    const userExists = data.value?.some((user) => user.uid === creds.user.uid);
    if (!userExists) {
      await addDoc(collection($db as Firestore, 'users'), {
        uid: creds.user.uid,
        email: creds.user.email
      });
    }
    return creds;
  };
  const onFirebaseLogin = async (email: string, password: string) => {
    const creds = await signInWithEmailAndPassword($auth as Auth, email, password);
    return creds;
  };

  const onFirebaseLogout = async () => {
    await signOut($auth as Auth);
  };

  const provider = new GithubAuthProvider();
  const onGitHubLogin = async () => {
    const creds = await signInWithPopup($auth as Auth, provider);
    const userExists = data.value?.some((user) => user.uid === creds.user.uid);
    if (!userExists) {
      await addDoc(collection($db as Firestore, 'users'), {
        uid: creds.user.uid,
        name: creds.user.displayName,
        email: creds.user.email,
        photoURL: creds.user.photoURL
      });
    }
    return creds;
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
    getCurrentUser
  };
}
