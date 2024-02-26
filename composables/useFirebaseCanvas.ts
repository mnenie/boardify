import type { User } from "firebase/auth";
import type { IBoard } from "~/types/board.interface";

export default function useFirebaseCanvas() {
  const {getCurrentUser} = useFirebaseAuth()

  const getDocBoard = async () => {
    const response = await getCurrentUser() as User
    if(response){
      return JSON.parse(localStorage.getItem("board")!)
    }
    return null;
  };

  const addNewCanvas = async (board: IBoard) => {
    const response = await getCurrentUser() as User
    if(response){
      localStorage.setItem("board", JSON.stringify(board))
    }
    return null
  }

  const deleteCanvas = () => {
    localStorage.removeItem("board")
  }

  return {
    getDocBoard,
    addNewCanvas,
    deleteCanvas
  };
}
