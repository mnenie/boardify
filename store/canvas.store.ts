export const useCanvasStore = defineStore("canvas", () => {
  const canvasSkeleton = ref(false);

  const setCanvasSkeleton = () => {
    setTimeout(() => {
      canvasSkeleton.value = true;
    }, 1500);
  };

  return {
    canvasSkeleton, setCanvasSkeleton
  };
});
