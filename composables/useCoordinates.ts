import { ElementType } from '~/types/element.type';
import type { Element } from '~/types/element.type';

export default function useCoordinates(panOffset: Ref<{ x: number; y: number }>) {
  const resizeCoordinates = (
    clientX: number,
    clientY: number,
    position: string,
    coordinates: { x1: number; x2: number; y1: number; y2: number }
  ) => {
    const { x1, y1, x2, y2 } = coordinates;
    switch (position) {
      case 'tl':
      case 'start':
        return { x1: clientX, y1: clientY, x2, y2 };
      case 'tr':
        return { x1, y1: clientY, x2: clientX, y2 };
      case 'bl':
        return { x1: clientX, y1, x2, y2: clientY };
      case 'br':
      case 'end':
        return { x1, y1, x2: clientX, y2: clientY };
    }
  };
  const getMouseCoords = (e: MouseEvent) => {
    const clientX = e.clientX - panOffset.value.x;
    const clientY = e.clientY - panOffset.value.y;
    return { clientX, clientY };
  };

  const adjustElementCoordinates = (element: Element) => {
    const { type, x1, x2, y1, y2 } = element;
    if (type === ElementType.Rectangle) {
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      return {
        x1: minX,
        x2: maxX,
        y1: minY,
        y2: maxY
      };
    } else {
      if (x1 < x2 || (x1 === x2 && y1 < y2)) {
        return { x1, y1, x2, y2 };
      } else {
        return {
          x1: x2,
          x2: x1,
          y1: y2,
          y2: y1
        };
      }
    }
  };

  return {
    resizeCoordinates,
    getMouseCoords,
    adjustElementCoordinates
  };
}
