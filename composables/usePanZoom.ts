export default function usePanZoom(canvasRef: Ref<HTMLCanvasElement | null>) {
  
  const context = ref<CanvasRenderingContext2D | null>(null);
  const isDragg = ref(false);
  const startDragPoints = ref({ x: 0, y: 0 });
  const pan = ref({ x: 0, y: 0 });

  const onMouseDownPan = (e: MouseEvent) => {
    isDragg.value = true;
    pan.value.x = e.clientX;
    pan.value.y = e.clientY;
    context.value!.translate(pan.value.x, pan.value.y)
  };
  const onMouseMovePan = (e: MouseEvent) => {
    if (isDragg.value) {
      const deltaX = e.clientX - pan.value.x;
      const deltaY = e.clientY - pan.value.y;
      pan.value.x = e.clientX;
      pan.value.y = e.clientY;
      updateCanvasPosition(deltaX, deltaY);
    }
  };
  const updateCanvasPosition = (deltaX: number, deltaY: number) => {
    const ctx = canvasRef.value?.getContext("2d");
    if (canvasRef.value && ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
      ctx.translate(deltaX, deltaY);
    }
  };
  const onMouseUpPan = () => {
    isDragg.value = false;
  };
  return {
    onMouseDownPan, onMouseUpPan, onMouseMovePan
  }
}