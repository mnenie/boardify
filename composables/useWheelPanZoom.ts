export default function useWheelPanZoom(
  scale: Ref<number>,
  panOffset: Ref<{ x: number; y: number }>
) {
  const onZoom = (delta: number) => {
    scale.value = Math.min(Math.max(scale.value + delta, 0.1), 2);
  };

  const panOrZoomFunction = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      onZoom(e.deltaY * 0.01);
    } else {
      panOffset.value = {
        x: panOffset.value.x - e.deltaX,
        y: panOffset.value.y - e.deltaY
      };
    }
  };

  return {
    onZoom,
    panOrZoomFunction
  };
}
