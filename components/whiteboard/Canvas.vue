<script setup lang="ts">
import { onMounted } from 'vue';

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

const { drawLine } = useDrawLine(toRef(props, 'color'), toRef(props, 'radius'), toRef(props, 'line'));
const { onMouseMove, onMouseDown, onMouseEnd, canvasRef, drawGrid, hideGrid, saveImage } = useDraw(drawLine)

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
}, {immediate: true});
</script>
<template>
  <div class="relative w-full h-full">
    <canvas ref="canvasRef" @mousedown="onMouseDown" @mouseup="onMouseEnd" @mousemove="onMouseMove"
      class="relative w-full h-full" />
  </div>
</template>