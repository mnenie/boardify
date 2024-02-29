import type { Element } from '~/types/element.type';
import { ElementType } from '~/types/element.type';
import { getStroke } from 'perfect-freehand';

export default function useDraw(elements: Ref<Element[]>, canvas: Ref<HTMLCanvasElement | null>) {
  const { getSvgPathFromStroke } = useCanvasParams(elements, canvas);

  const drawElement = (roughCanvas: any, context: CanvasRenderingContext2D, element: Element) => {
    switch (element.type) {
      case ElementType.Rectangle:
        roughCanvas.draw(element.roughElement);
        break;
      case ElementType.Pensil:
        const stroke = getSvgPathFromStroke(getStroke(element.points!));
        context.fill(new Path2D(stroke));
        break;
      case ElementType.Text:
        context.textBaseline = 'top';
        context.font = '24px sans-serif';
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
