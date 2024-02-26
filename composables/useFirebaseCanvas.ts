import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import type { Firestore } from "firebase/firestore";
import type { IUser } from "~/types/user.interface";

export default function useFirebaseCanvas() {
  const { $db } = useNuxtApp();
  const canvasStore = useCanvasStore()

  const addNewBoard = async () => {
    canvasStore.setBoard()
  };

  const deleteDocBoard = async (id: string) => {
    await deleteDoc(doc($db as Firestore, "board", id));
  };

  const getDocBoard = async () => {
    const docRef = doc($db as Firestore, "users", "user")
    const docSnap = await getDoc(docRef)
    return docSnap.data() as IUser
  }

  return {
    addNewBoard,
    deleteDocBoard,
    getDocBoard
  };
}
