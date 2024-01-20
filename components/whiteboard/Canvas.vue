<script setup lang="ts">
import { io } from 'socket.io-client';
import type { IDraw } from '~/types/draw.interface';
import type { IDrawLine } from '~/types/draw.interface';

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
const { drawLine, drawElements } = useDrawLine();
const { onMouseMove, onMouseDown, onMouseEnd, drawGrid, hideGrid, saveImage } = useDraw(createLine, canvasRef)
const { onMouseDownPan, onMouseMovePan, onMouseUpPan } = usePanZoom(canvasRef, drawElements)

const onMove = (e: MouseEvent) => (props.isDraggable ? onMouseMovePan(e) : onMouseMove(e))
const onDown = (e: MouseEvent) => (props.isDraggable ? onMouseDownPan(e) : onMouseDown())
const onUp = () => (props.isDraggable ? onMouseUpPan() : onMouseEnd())

onMounted(() => {
  drawGrid()
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

const socket = io('/draw', {
  path: '/api/socket.io'
})
watchEffect(() => {
  const ctx = canvasRef.value?.getContext('2d')
  socket.emit('client-ready')
  socket.on('get-canvas', () => {
    if (!canvasRef.value?.toDataURL()) return
    socket.emit('canvas-state', canvasRef.value.toDataURL())
  })
  socket.on('canvas-state-server', (state: string) => {
    const img = new Image()
    img.src = state
    img.onload = () => {
      ctx?.drawImage(img, 0, 0)
    }
  })
  socket.on('draw-line', ({ prevPoint, currentPoint, color, radius, line }: IDrawLine) => {
    if (!ctx) return console.log('err');
    drawLine({ prevPoint, currentPoint, ctx }, toRef(props.color), toRef(props.radius), toRef(props.line));
  });
})

function createLine({ prevPoint, currentPoint, ctx }: IDraw) {
  socket.emit('draw-line', { prevPoint, currentPoint, color: toRef(props, 'color'), radius: toRef(props, 'radius'), line: toRef(props, 'line') })
  drawLine({ prevPoint, currentPoint, ctx }, toRef(props, 'color'), toRef(props, 'radius'), toRef(props, 'line'))
}
</script>
<template>
  <div class="fixed">
    <canvas ref="canvasRef" @mousedown="onDown" @mouseup="onUp" @mousemove="onMove"
      class="fixed w-full h-full dark:bg-neutral-800" />
  </div>
</template>