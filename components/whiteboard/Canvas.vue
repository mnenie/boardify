<script setup lang="ts">
import rough from 'roughjs';
import { ElementType } from '~/types/element.type';
import type { Element } from '~/types/element.type';
import { Action } from '~/types/action.enum';

const props = defineProps<{
  isTool: ElementType;
}>();

const elements = ref<Element[]>([]);
const canvas = ref<HTMLCanvasElement | null>(null);
const action = ref('none');
const selectedElement = ref<Element | null>(null);
const panOffset = ref({ x: 0, y: 0 });
const startPanMousePosition = ref({ x: 0, y: 0 });
const scale = ref(1);
const scaleOffset = ref({ x: 0, y: 0 });
const textArea = ref<HTMLTextAreaElement | null>(null);

const { handleResize } = useSizeParams(canvas);
const { drawElement } = useDraw(elements, canvas);
const { panOrZoomFunction } = useWheelPanZoom(scale, panOffset);
const { handleBlur } = useTextArea(selectedElement, action, elements, canvas);

const { onMouseDown, onMouseMove, onMouseUp } = useMouseEvents(
  action,
  panOffset,
  props,
  elements,
  selectedElement,
  startPanMousePosition,
  canvas
);

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
      elements.value.forEach((element: Element) => {
        if (action.value === Action.WRITING && selectedElement.value!.id === element.id) return;
        drawElement(roughCanvas, ctx!, element);
      });
    }
    ctx?.restore();
  }
};

watchEffect(() => {
  setParamsCanvas();
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

onMounted(() => {
  handleResize();
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
</script>

<template>
  <canvas
    ref="canvas"
    class="absolute dark:bg-neutral-800 pointer-events-auto"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
  >
    Canvas
  </canvas>
  <textarea
    v-if="action === 'writing'"
    ref="textArea"
    class="fixed m-0 p-0 border-0 outline-0 overflow-hidden resize-none bg-transparent z-10 w-full"
    :style="{
      top: selectedElement?.y1! - 2 + panOffset.y + 'px',
      left: selectedElement?.x1! + panOffset.x + 'px',
      font: '24px sans-serif'
    }"
    @blur="handleBlur"
  />
</template>
