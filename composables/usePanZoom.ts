export default function usePanZoom(
  canvasRef: Ref<HTMLCanvasElement | null>, drawElements: Ref<Array<{style: { color: string; radius: number; line: number };points: { x: number; y: number }[]}>>) {
  const isPanning = ref(false);
  const panStart = ref({ x: 0, y: 0 });
  const offset = ref({ x: 0, y: 0 });

  const onMouseDownPan = (event: MouseEvent) => {
    isPanning.value = true;
    panStart.value = { x: event.clientX, y: event.clientY };
  };

  const onMouseMovePan = (event: MouseEvent) => {
    if (isPanning.value) {
      const offsetX = event.clientX - panStart.value.x
      const offsetY = event.clientY - panStart.value.y
      offset.value = {
        x: offset.value.x + offsetX,
        y: offset.value.y + offsetY,
      };
      panStart.value = { x: event.clientX, y: event.clientY }
      updateCanvasPosition();
    }
  };

  const onMouseUpPan = () => {
    isPanning.value = false;
  };

  const updateCanvasPosition = () => {
    if (canvasRef.value) {
      const ctx = canvasRef.value.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
        drawElements.value.forEach((element) => {
          const { style, points } = element;
          const scaledRadius = style.radius;
  
          ctx.beginPath();
          ctx.lineWidth = style.line;
          ctx.strokeStyle = style.color;
          ctx.fillStyle = style.color;
          ctx.arc(points[0].x + offset.value.x, points[0].y + offset.value.y, scaledRadius, 0, style.radius * Math.PI);
          ctx.fill();
          ctx.moveTo(points[0].x + offset.value.x, points[0].y + offset.value.y);
          ctx.lineTo(points[1].x + offset.value.x, points[1].y + offset.value.y);
          ctx.stroke();
        });
      }
    }
  };

  return {
    onMouseDownPan,
    onMouseMovePan,
    onMouseUpPan,
    offset
  };
}
