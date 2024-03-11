<script setup lang="ts">
import rough from 'roughjs';
import { ElementType } from '~/types/element.type';
import type { Element } from '~/types/element.type';
import { Action } from '~/types/action.enum';
import { io } from 'socket.io-client';
import { saveCanvas } from '~/helpers/helperSaveCanvasPng';

const props = defineProps<{
  isTool: ElementType;
  color: string;
  lineWidth: number;
  elements: Array<Element>;
  history: Array<Element[]>;
  redoHistory: Array<Element[]>;
  canvas: HTMLCanvasElement | null;
  isSave: boolean;
}>();

const emit = defineEmits<{
  (e: 'resetImgTool'): void;
}>();

const socket = io('/draw', {
  path: '/api/socket.io'
});

const elements = toRef(props.elements);
const canvas = toRef(props.canvas);
const action = ref('none');
const selectedElement = ref<Element | null>(null);
const scale = ref(1);
const scaleOffset = ref({ x: 0, y: 0 });
const panOffset = ref({ x: 0, y: 0 });
const startPanMousePosition = ref({ x: 0, y: 0 });
const textArea = ref<HTMLTextAreaElement | null>(null);
const history = toRef(props.history);
const redoHistory = toRef(props.redoHistory);

const { handleResize } = useSizeParams(canvas);
const { drawElement } = useDraw();
const { panOrZoomFunction, onZoom } = useWheelPanZoom(scale, panOffset);
const { handleBlur } = useTextArea(selectedElement, action, elements, canvas);
const { onMouseDown, onMouseMove, onMouseUp } = useMouseEvents(
  action,
  panOffset,
  props,
  elements,
  redoHistory,
  history,
  selectedElement,
  startPanMousePosition,
  canvas,
  socket,
  scale,
  scaleOffset
);
const { saveToLocalStorage, loadFromLocalStorage } = useLocalCanvas(elements);

const { undo, redo } = useUndoRedo(elements, history, redoHistory);

const setParamsCanvas = () => {
  if (canvas.value) {
    const ctx = canvas.value.getContext('2d');
    const roughCanvas = rough.canvas(canvas.value);

    ctx?.clearRect(0, 0, canvas.value.width, canvas.value.height);

    const scaleWidth = canvas.value.width * scale.value;
    const scaleHeight = canvas.value.height * scale.value;

    const scaleOffsetX = (scaleWidth - canvas.value.width) / 2;
    const scaleOffsetY = (scaleHeight - canvas.value.height) / 2;

    scaleOffset.value = { x: scaleOffsetX, y: scaleOffsetY };

    ctx?.save();
    ctx?.translate(
      panOffset.value.x * scale.value - scaleOffsetX,
      panOffset.value.y * scale.value - scaleOffsetY
    );
    ctx?.scale(scale.value, scale.value);
    if (elements.value) {
      saveToLocalStorage();
      elements.value.forEach((element: Element) => {
        if (action.value === Action.WRITING && selectedElement.value!.id === element.id) return;
        drawElement(roughCanvas, ctx!, element);
      });
    }
    ctx?.restore();
  }
};

onMounted(() => {
  loadFromLocalStorage();
  handleResize();
  socket.emit('client-ready');
  socket.on('get-canvas', () => {
    if (!canvas.value?.toDataURL()) return;
    socket.emit('canvas-state', canvas.value.toDataURL());
    loadFromLocalStorage();
  });
  document.addEventListener('mouseleave', () => {
    action.value = 'none';
    selectedElement.value = null;
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('mouseleave', () => {
    action.value = 'none';
    selectedElement.value = null;
  });
});

watchEffect(() => {
  setParamsCanvas();
});

watchEffect(() => {
  if (canvas.value) {
    const ctx = canvas.value?.getContext('2d');
    socket.on('draw-elements', (element: Element) => {
      if (!ctx) return console.log('no ctx here');
      drawElement(rough.canvas(canvas.value), ctx, element);
    });
  }
});

watchEffect(() => {
  if (document) {
    document.addEventListener('wheel', panOrZoomFunction);
  }
  if (action.value === 'writing') {
    setTimeout(() => {
      textArea.value!.focus();
      textArea.value!.value = selectedElement.value!.text!;
    }, 0);
  }
});

watch(
  () => props.isSave,
  (newValue) => {
    if (canvas.value) {
      if (newValue) {
        saveCanvas(canvas);
        emit('resetImgTool')
      }
    }
  },
  { immediate: true }
);
</script>

<template>
  <canvas
    ref="canvas"
    class="pointer-events-auto absolute h-full w-full dark:bg-neutral-950"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
  >
    Canvas
  </canvas>
  <textarea
    v-if="action === 'writing'"
    ref="textArea"
    class="fixed z-10 m-0 w-full resize-none overflow-hidden border-0 bg-transparent p-0 outline-0"
    :style="{
      top: (selectedElement?.y1! - 2) * scale + panOffset.y * scale - scaleOffset.y + 'px',
      left: selectedElement?.x1! * scale + panOffset.x * scale - scaleOffset.x + 'px',
      font: `${18 * scale}px sans-serif`,
      color: color
    }"
    @blur="handleBlur"
  />
  <WhiteboardUndoRedo @undo="undo" @redo="redo" />
  <WhiteboardScale :scale="scale" @minus-zoom="() => onZoom(-0.1)" @plus-zoom="() => onZoom(0.1)" />
</template>
