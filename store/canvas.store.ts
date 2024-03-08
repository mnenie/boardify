import { v4 as uuid } from 'uuid';
import { useAuthStore } from '@/store/auth.store';
import type { IBoard } from '~/types/board.interface';
import type { IUser } from '~/types/user.interface';

export const useCanvasStore = defineStore('canvas', () => {
  const canvasSkeleton = ref(false);
  const board = ref<IBoard>({} as IBoard);
  const canvasRef = ref<HTMLCanvasElement>();
  const elements = ref<Element[]>([]);

  const { getDocBoard, addNewCanvas, deleteCanvas } = useFirebaseCanvas();
  const authStore = useAuthStore();

  const setCanvasSkeleton = () => {
    setTimeout(() => {
      canvasSkeleton.value = true;
    }, 1500);
  };

  const getBoard = async () => {
    try {
      const response = await getDocBoard();
      board.value = response;
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const setBoard = async () => {
    try {
      await authStore.getCurrentSessionUser();
      board.value = {
        id: uuid(),
        name: 'untitled',
        users: [{ id: authStore.user.id, email: authStore.user.email }]
      };
      const boardInfo = board.value;
      await addNewCanvas(boardInfo);
    } catch (err) {
      console.log(err);
    }
  };

  const updateCanvas = async (user: IUser) => {
    try {
      const userExists = board.value.users.some((existsUser) => existsUser.id === user.id);
      if (!userExists) {
        board.value.users.push({ id: user.id, email: user.email });
        localStorage.setItem('board', JSON.stringify(board.value));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBoard = async () => {
    try {
      await deleteBoard();
      board.value = {} as IBoard;
    } catch (err) {
      console.log(err);
    }
  };

  const renameBoard = async(newName: string) => {
    try{
      board.value.name = newName
      localStorage.setItem('board', JSON.stringify(board.value));
    }
    catch(err){
      console.log(err);
    }
  }


  return {
    canvasSkeleton,
    setCanvasSkeleton,
    board,
    getBoard,
    setBoard,
    canvasRef,
    elements,
    renameBoard
  };
});
