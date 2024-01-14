<script setup lang="ts">
import type { IDraw } from '~/types/draw.interface';
import { VueInfiniteViewer } from "vue3-infinite-viewer";

const props = defineProps<{
  line: number,
  color: string,
  radius: number,
  isDraggable: boolean
}>()

const { onMouseMove, onMouseDown, onMouseEnd, canvasRef, context } = useDraw(drawLine)

const viewer = ref();
const viewport = ref();

function drawLine({ prevPoint, currentPoint, ctx }: IDraw) {
  if (props.isDraggable) {
    return;
  }

  const { x: currX, y: currY } = currentPoint;
  const lineColor = props.color;
  const lineWidth = props.line;

  let startPoint = prevPoint ?? currentPoint;

  const canvas = canvasRef.value;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const adjustedStartX = startPoint.x - rect.left - canvas.scrollLeft;
  const adjustedStartY = startPoint.y - rect.top - canvas.scrollTop;
  const adjustedCurrX = currX - rect.left - viewport.value.scrollLeft;
  const adjustedCurrY = currY - rect.top - viewport.value.scrollTop;

  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.moveTo(Math.round(adjustedStartX), Math.round(adjustedStartY));
  ctx.lineTo(Math.round(adjustedCurrX), Math.round(adjustedCurrY));
  ctx.stroke();
  ctx.imageSmoothingEnabled = false;

  const fillColor = props.color;
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.arc(
    Math.round(adjustedStartX),
    Math.round(adjustedStartY),
    props.radius,
    0,
    props.radius * Math.PI
  );
  ctx.fill();
}


const zooms = [5, 10, 25, 50, 75, 100, 125, 150, 200, 300, 400, 500];
const defaultZoomIndex = zooms.findIndex(v => v === 100);
const zoom = ref(defaultZoomIndex);
const zoomFactor = computed(() => zooms[zoom.value] / 100);



function onScroll(e: any): void {
  if (!canvasRef.value) return;
  canvasRef.value.style.transform = `translate(${e.scrollLeft}px, ${e.scrollTop}px)`;
}
</script>
<template>
  <div class="editor">
    <vue-infinite-viewer ref="viewer" class="viewer" @wheel="onScroll" @scroll="onScroll" :useWheelScroll="true"
      :zoom="zoomFactor" :useMouseDrag="false">
      <div ref="viewport" class="viewport">
        <canvas ref="canvasRef" class="canvas_b" @mousedown="onMouseDown" @mouseup="onMouseEnd" @mousemove="onMouseMove">
        </canvas>
      </div>
    </vue-infinite-viewer>
  </div>
</template>

<style scoped>
.editor {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.infinite-viewer-scroll-bar {
  display: none;
}

.canvas_b {
  position: relative;
  left: 0px;
  top: 0px;
  border: 2px solid red;
  z-index: -100000;
  width: 100%;
  height: 100%;
}

.viewer {
  box-sizing: border-box;
  position: relative;
  top: 0px;
  left:0px;
  width: 100%;
  height: 100%;
  background-color: white;
  user-select: none;
}

.viewport {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;

}
</style>
