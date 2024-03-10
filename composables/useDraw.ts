import type { Element } from '~/types/element.type';
import { ElementType } from '~/types/element.type';
// unuse
// import { getStroke } from 'perfect-freehand';

type Point = {
  x: number;
  y: number;
};

export default function useDraw() {
  // experimental mode
  // const { getSvgPathFromStroke } = useCanvasParams(elements, canvas);

  const drawPensil = (
    context: CanvasRenderingContext2D,
    points: Point[],
    color: string,
    lineWidth: number
  ) => {
    if (points.length < 2) return;
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const { x, y } = points[i];
      context.lineTo(x, y);
    }

    context.stroke();
  };

  const drawElement = (roughCanvas: any, context: CanvasRenderingContext2D, element: Element) => {
    switch (element.type) {
      case ElementType.Rectangle:
        roughCanvas.draw(element.roughElement);
        break;
      case ElementType.Pensil:
        drawPensil(context, element.points!, element.color, element.lineWidth);
        break;
      case ElementType.Text:
        context.textBaseline = 'top';
        context.font = '18px sans-serif';
        context.fillStyle = element.color;
        context.fillText(element.text!, element.x1, element.y1);
        break;
      default:
        throw new Error('err');
    }
  };
  return {
    drawElement
  };
}
