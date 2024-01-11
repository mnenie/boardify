<script setup lang="ts">
import type { IDraw } from '~/types/draw.interface';
const { canvasRef, onMouseMove, onMouseDown, onMouseEnd } = useDraw(drawLine)

const color = ref("#000")

function drawLine({ prevPoint, currentPoint, ctx }: IDraw) {
  const { x: currX, y: currY } = currentPoint
  const lineColor = color
  const lineWidth = 5

  let startPoint = prevPoint ?? currentPoint
  ctx.beginPath()
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = lineColor.value
  ctx.moveTo(Math.round(startPoint.x), Math.round(startPoint.y))
  ctx.lineTo(Math.round(currX), Math.round(currY))
  ctx.stroke()
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = lineColor.value
  ctx.beginPath()
  ctx.arc(Math.round(startPoint.x), Math.round(startPoint.y), 2, 0, 2 * Math.PI)
  ctx.fill()
}
</script>

<template>
  <div class="bg-gray-50 h-screen w-screen relative flex justify-center items-center">
    <canvas ref="canvasRef" class="border border-black rounded-md" style="width: 750px; height: 750px;" @mousedown="onMouseDown" @mouseup="onMouseEnd"
      @mousemove="onMouseMove"></canvas>
  </div>
  <WhiteboardName />
  <WhiteboardDrawSettings />
  <WhiteboardUsers />
  <WhiteboardScale />
  <WhiteboardMode />
  <WhiteboardDrawItems />
</template>

<style scoped></style>
