<script setup lang="ts">
import type { IDraw } from '~/types/draw.interface';
import { CANVAS_SIZE } from '~/utils/consts';

const props = defineProps<{
  line: number,
  color: string,
  radius: number,
  isDraggable: boolean
}>()


const { onMouseMove, onMouseDown, onMouseEnd, canvasRef } = useDraw(drawLine,)
function drawLine({ prevPoint, currentPoint, ctx }: IDraw) {
  const { x: currX, y: currY } = currentPoint
  const lineColor = props.color
  const lineWidth = props.line

  let startPoint = prevPoint ?? currentPoint
  ctx.beginPath()
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = lineColor
  ctx.moveTo(Math.round(startPoint.x), Math.round(startPoint.y))
  ctx.lineTo(Math.round(currX), Math.round(currY))
  ctx.stroke()
  ctx.imageSmoothingEnabled = false;
  const fillColor = props.color
  ctx.fillStyle = fillColor
  ctx.beginPath()
  ctx.arc(Math.round(startPoint.x), Math.round(startPoint.y), props.radius, 0, props.radius * Math.PI)
  ctx.fill()
}

const { x, y, style } = useDraggable(canvasRef, {
  initialValue: { x: 40, y: 40 },
})
</script>
<template>
  <canvas ref="canvasRef"
    @mousedown="onMouseDown" @mouseup="onMouseEnd" @mousemove="onMouseMove" class="position: fixed w-full h-full"></canvas>
</template>
