import { ElementType } from '~/types/element.type';
import type { Element } from '~/types/element.type';

export default function usePosition(
  elements: Ref<Element[]>,
  canvas: Ref<HTMLCanvasElement | null>
) {
  const { nearPoint, onLine } = useCanvasParams(elements, canvas);

  const positionWithElement = (x: number, y: number, element: Element) => {
    const { type, x1, x2, y1, y2 } = element;
    switch (type) {
      case ElementType.Rectangle:
        const topLeft = nearPoint(x, y, x1, y1, 'tl');
        const topRight = nearPoint(x, y, x2, y1, 'tr');
        const bottomLeft = nearPoint(x, y, x1, y2, 'bl');
        const bottomRight = nearPoint(x, y, x2, y2, 'br');
        const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? 'inside' : null;
        return topLeft || topRight || bottomLeft || bottomRight || inside;
      case ElementType.Pensil:
        const betweenAnyPoint = element.points!.some((point, index) => {
          const nextPoint = element.points![index + 1];
          if (!nextPoint) return false;
          return onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) != null;
        });
        return betweenAnyPoint ? 'inside' : null;
      case ElementType.Text:
        return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? 'inside' : null;
    }
  };
  const getElementInPosition = (x: number, y: number, elements: Element[]) => {
    return elements
      .map((element) => ({
        ...element,
        position: positionWithElement(x, y, element)
      }))
      .find((element) => element.position !== null);
  };

  return {
    getElementInPosition,
    positionWithElement
  };
}
