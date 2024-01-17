<script setup lang="ts">
type IProps = {
  line: number,
  color: string,
  radius: number,
  isDraggable: boolean,
  isGrid: boolean,
  onSave: boolean
}
const props = defineProps<IProps>()

const emit = defineEmits<{
  (e: 'imageStateReset'): void
}>()
const canvasRef = ref<HTMLCanvasElement | null>(null);
const { drawLine, drawElements } = useDrawLine(toRef(props, 'color'), toRef(props, 'radius'), toRef(props, 'line'));
const { onMouseMove, onMouseDown, onMouseEnd, drawGrid, hideGrid, saveImage} = useDraw(drawLine, canvasRef)
const {onMouseDownPan, onMouseMovePan, onMouseUpPan} = usePanZoom(canvasRef, drawElements)

const onMove = (e: MouseEvent) => (props.isDraggable ? onMouseMovePan(e) : onMouseMove(e))
const onDown = (e: MouseEvent) => (props.isDraggable ? onMouseDownPan(e) : onMouseDown())
const onUp = () => (props.isDraggable ? onMouseUpPan() : onMouseEnd())

onMounted(async () => {
  await drawGrid()
})

watch(() => props.isGrid, (newValue) => {
  if (canvasRef.value) {
    if (newValue) {
      drawGrid();
    } else {
      hideGrid();
    }
  }
}, { immediate: true });

watch(() => props.onSave, (newValue) => {
  if (canvasRef.value) {
    if (newValue) {
      saveImage();
      emit('imageStateReset');
    }
  }
}, { immediate: true });
</script>
<template>
  <div class="fixed">
    <canvas ref="canvasRef" @mousedown="onDown" @mouseup="onUp" @mousemove="onMove"
      class="fixed w-full h-full dark:bg-neutral-800" />
  </div>
</template>