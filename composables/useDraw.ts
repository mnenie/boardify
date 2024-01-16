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

  const { isDark } = useMode();
  const isHide = ref(false)

  const drawGrid = () => {
    isHide.value = false
    if(isHide.value) return
    const canvas = canvasRef.value!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1;
    const gridColor = computed(() =>
      isDark.value ? "rgba(64, 64, 64, 0.4)" : "rgb(229, 231, 235)"
    );
    ctx.strokeStyle = gridColor.value;

    const gridSize = 20;

    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };

  const hideGrid = () => {
    isHide.value = true
    const canvas = canvasRef.value!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gridSize = 20;
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.clearRect(x - 1, 0, 2, canvas.height);
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.clearRect(0, y - 1, canvas.width, 2);
    }
  };

  watch(
    [isDark, isHide],
    ([darkValue, hideValue]) => {
      if (!hideValue) {
        drawGrid();
      }
    },
    { immediate: true }
  );

  const saveImage = () => {
    if (canvasRef.value) {
      const canvas = canvasRef.value;
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "canvas.png";
      link.click();
    }
  };

  onMounted(() => {
    if (canvasRef.value) {
      canvasRef.value.width = canvasRef.value.clientWidth;
      canvasRef.value.height = canvasRef.value.clientHeight;
      canvasRef.value?.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseEnd);
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
    drawGrid,
    hideGrid,
    saveImage,
  };
}
