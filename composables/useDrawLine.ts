import type { IDraw } from "~/types/draw.interface"

export default function useDrawLine() {
  const drawElements = ref<Array<{ style: { color: string; radius: number; line: number }; points: { x: number; y: number }[] }>>([]);
  const drawLine = ({ prevPoint, currentPoint, ctx, }: IDraw, color: Ref<string>, radius: Ref<number>, line: Ref<number>) => {
    const { x: currX, y: currY } = currentPoint
    const lineColor = color.value
    const lineWidth = line.value
  
    let startPoint = prevPoint ?? currentPoint
    const currentRadius = radius.value
    ctx.beginPath();
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(Math.round(startPoint.x), Math.round(startPoint.y))
    ctx.lineTo(Math.round(currX), Math.round(currY))
    ctx.stroke();
    ctx.imageSmoothingEnabled = false
    const fillColor = color.value
    ctx.fillStyle = fillColor
    ctx.beginPath();
    ctx.arc(Math.round(startPoint.x), Math.round(startPoint.y), currentRadius, 0, currentRadius * Math.PI);
    ctx.fill()

    drawElements.value.push({
      style: {
        color: lineColor,
        radius: currentRadius,
        line: lineWidth,
      },
      points: [
        { x: Math.round(startPoint.x), y: Math.round(startPoint.y) },
        { x: Math.round(currX), y: Math.round(currY) },
      ],
    })
  }

  return {
    drawLine,
    drawElements
  }
}