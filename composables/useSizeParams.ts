export default function useSizeParams(canvas: Ref<HTMLCanvasElement | null>) {
  const handleResize = () => {
    if (canvas.value) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.value.width = width;
      canvas.value.height = height;
    }
  };
  return { handleResize };
}
