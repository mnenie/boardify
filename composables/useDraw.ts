import type { IDraw, Point } from "~/types/draw.interface";

export default function useDraw(
  onDraw: ({ ctx, currentPoint, prevPoint }: IDraw) => void
) {
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  const drawing = ref(false);
  const context = ref<CanvasRenderingContext2D | null>(null);
  const prevPoint = ref<null | Point>(null);

  const computePoints = (e: MouseEvent) => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    return { x, y };
  };

  const onMouseDown = () => {
    drawing.value = true;
  };

  const onMouseEnd = () => {
    drawing.value = false;
    prevPoint.value = null;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!drawing.value) return;
    const currentPoint = computePoints(e);

    const ctx = canvasRef.value?.getContext("2d");
    if (!ctx || !currentPoint) return;

    onDraw({ ctx, currentPoint, prevPoint: prevPoint.value });
    prevPoint.value = currentPoint;
  };

  const clear = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const gridDraw = () => {};

  onMounted(() => {
    if (canvasRef.value) {
      const canvas = canvasRef.value;
      context.value = canvas.getContext("2d");
      if (context.value) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        canvas.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseEnd);
      }
    }
  });
  onUnmounted(() => {
    canvasRef.value?.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseEnd);
  });
  return {
    canvasRef,
    onMouseDown,
    onMouseEnd,
    onMouseMove,
    clear,
    context,
  };
}
