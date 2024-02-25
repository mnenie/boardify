import {
  addDoc,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import type { Firestore } from "firebase/firestore";

export default function useFirebaseCanvas() {
  const { $db } = useNuxtApp();
  const canvasStore = useCanvasStore()

  const addNewBoard = async () => {
    canvasStore.setBoard()
  };

  const deleteDocBoard = async (id: string) => {
    await deleteDoc(doc($db as Firestore, "board", id));
  };

  return {
    addNewBoard,
    deleteDocBoard,
  };
}
