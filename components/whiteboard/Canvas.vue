<script setup lang="ts">
import type { IDraw } from '~/types/draw.interface';

const props = defineProps<{
  line: number,
  color: string,
  radius: number
}>()

const { onMouseMove, onMouseDown, onMouseEnd, canvasRef } = useDraw(drawLine)
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
</script>
<template>
  <canvas ref="canvasRef" class="border border-black rounded-md w-full h-full"
    @mousedown="onMouseDown" @mouseup="onMouseEnd" @mousemove="onMouseMove"></canvas>
</template>
