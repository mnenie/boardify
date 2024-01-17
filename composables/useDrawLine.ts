import type { IDraw } from "~/types/draw.interface"

export default function useDrawLine(color: Ref<string>, radius: Ref<number>, line: Ref<number>) {
  const drawLine = ({ prevPoint, currentPoint, ctx }: IDraw) => {
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
    ctx.arc(Math.round(startPoint.x), Math.round(startPoint.y), radius.value, 0, radius.value * Math.PI)
    ctx.fill()
  }

  return {
    drawLine
  }
}