import { ElementType } from '~/types/element.type';
import type { Element } from '~/types/element.type';
import type { Point } from '~/types/point.type';
import rough from 'roughjs';

const generator = rough.generator();

export default function useCanvas(elements: Ref<Element[]>, canvas: Ref<HTMLCanvasElement | null>) {
  const createElement = ({
    id,
    x1,
    y1,
    x2,
    y2,
    type,
    points,
    color,
    lineWidth
  }: Element): Element => {
    switch (type) {
      case ElementType.Rectangle:
        const roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, { fill: color });
        return { id, x1, y1, x2, y2, type, roughElement, color, lineWidth };
      case ElementType.Pensil:
        return {
          id,
          type,
          points: [{ x: x1, y: y1 }],
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
          color: color,
          lineWidth: lineWidth
        };
      case ElementType.Text:
        return { id, type, x1, y1, text: '', x2: x2, y2: y2, color, lineWidth };
      default:
        throw new Error('err');
    }
  };
  const getSvgPathFromStroke = (stroke: any): string => {
    if (!stroke.length) return '';

    const d = stroke.reduce(
      (acc: (string | number)[], [x0, y0]: Point, i: number, arr: Point[]) => {
        const [x1, y1] = arr[(i + 1) % arr.length];
        acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        return acc;
      },
      ['M', ...stroke[0], 'Q']
    );

    d.push('Z');
    return d.join(' ');
  };

  const updateElement = (dataElement: Element) => {
    const elementsCopy = [...elements.value];
    switch (dataElement.type) {
      case ElementType.Rectangle:
        elementsCopy[dataElement.id] = createElement(dataElement);
        break;
      case ElementType.Pensil:
        elementsCopy[dataElement.id].points = [
          ...(elementsCopy[dataElement.id].points as any),
          { x: dataElement.x2, y: dataElement.y2 }
        ];
        break;
      case ElementType.Text:
        const textWidth = canvas!
          .value!.getContext('2d')!
          .measureText(dataElement.options.text).width;
        const textHeight = 18;
        elementsCopy[dataElement.id] = {
          ...createElement({
            id: dataElement.id,
            x1: dataElement.x1,
            y1: dataElement.y1,
            x2: dataElement.x1 + textWidth,
            y2: dataElement.y1 + textHeight,
            type: dataElement.type,
            color: dataElement.color,
            lineWidth: dataElement.lineWidth
          }),
          text: dataElement.options.text
        };
        break;
      default:
        throw new Error('err');
    }
    elements.value = elementsCopy;
  };

  function cursorForPosition(position: string) {
    switch (position) {
      case 'tl':
      case 'br':
      case 'start':
      case 'end':
        return 'nwse-resize';
      case 'tr':
      case 'bl':
        return 'nesw-resize';
      default:
        return 'default';
    }
  }

  const nearPoint = (x: number, y: number, x1: number, y1: number, name: string) => {
    return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
  };

  const distance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

  const onLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x: number,
    y: number,
    maxDistance = 1
  ) => {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    return Math.abs(offset) < maxDistance ? 'inside' : null;
  };

  return {
    createElement,
    getSvgPathFromStroke,
    cursorForPosition,
    nearPoint,
    distance,
    onLine,
    updateElement
  };
}
