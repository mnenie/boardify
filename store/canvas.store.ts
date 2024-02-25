import { v4 as uuid } from "uuid";
import { useAuthStore } from "@/store/auth.store";
import type { IBoard } from "~/types/board.interface";

export const useCanvasStore = defineStore("canvas", () => {
  const canvasSkeleton = ref(false);
  const board = ref({} as IBoard);
  const { user } = useAuthStore();

  const setCanvasSkeleton = () => {
    setTimeout(() => {
      canvasSkeleton.value = true;
    }, 1500);
  };

  const setBoard = () => {
    board.value = {
      id: uuid(),
      name: "untitled",
      users: [],
    };
    return board.value;
  };

  const getBoard = () => {
    board.value = user.board!
  }

  return {
    canvasSkeleton,
    setCanvasSkeleton,
    setBoard,
    board
  };
});
