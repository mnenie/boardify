export const useCanvasStore = defineStore("canvas", () => {
  const canvasSkeleton = ref(false);

  const setCanvasSkeleton = () => {
    setTimeout(() => {
      canvasSkeleton.value = true;
    }, 2000);
  };

  return {
    canvasSkeleton, setCanvasSkeleton
  };
});
