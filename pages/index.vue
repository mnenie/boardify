<script setup lang="ts">
import type { IDraw } from '~/types/draw.interface';
const { canvasRef, onMouseMove, onMouseDown, onMouseEnd } = useDraw(drawLine)

const color = ref("#000")
const line = ref(10)
const changeEraser = () => {
  color.value = 'rgb(249 250 251)'
  line.value = 25
}

function drawLine({ prevPoint, currentPoint, ctx }: IDraw) {
  const { x: currX, y: currY } = currentPoint
  const lineColor = color.value
  const lineWidth = line.value

  let startPoint = prevPoint ?? currentPoint
  ctx.beginPath()
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = lineColor
  ctx.moveTo(Math.round(startPoint.x), Math.round(startPoint.y))
  ctx.lineTo(Math.round(currX), Math.round(currY))
  ctx.stroke()
  ctx.imageSmoothingEnabled = false;
  const fillColor = color.value
  ctx.fillStyle = fillColor
  ctx.beginPath()
  ctx.arc(Math.round(startPoint.x), Math.round(startPoint.y), 5, 0, 5 * Math.PI)
  ctx.fill()
}

provide('eraseColor',{changeEraser})

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

