import type { Props } from 'nuxt/dist/head/runtime/types';
import { ElementType } from '~/types/element.type';
import type { Element } from '~/types/element.type';

export default function useMouseEvents(
  action: Ref<string>,
  panOffset: Ref<{ x: number; y: number }>,
  props: Props,
  elements: Ref<Element[]>,
  selectedElement: Ref<Element | null>,
  startPanMousePosition: Ref<{ x: number; y: number }>,
  canvas: Ref<HTMLCanvasElement | null>
) {
  const { getMouseCoords, resizeCoordinates, adjustElementCoordinates } = useCoordinates(panOffset);
  const { getElementInPosition } = usePosition(elements, canvas);
  const { createElement, cursorForPosition, updateElement } = useCanvasParams(elements, canvas);

  const onMouseDown = (e: MouseEvent) => {
    if (action.value === 'writing') return;

    const { clientX, clientY } = getMouseCoords(e);
    if (props.isTool === ElementType.Move) {
      action.value = 'panning';
      startPanMousePosition.value = { x: clientX, y: clientY };
    }
    if (props.isTool === ElementType.Selection && elements.value) {
      const element = getElementInPosition(clientX, clientY, elements.value);
      if (element) {
        if (element.type === ElementType.Pensil) {
          const offsetsX = element.points!.map((point) => clientX - point.x)!;
          const offsetsY = element.points!.map((point) => clientY - point.y)!;
          selectedElement!.value = { ...element, offsetsX, offsetsY }!;
        } else {
          const offsetX = clientX - element.x1;
          const offsetY = clientY - element.y1;
          selectedElement!.value = { ...element, offsetX, offsetY }!;
        }
        elements.value = elements.value;
        if (element.position === 'inside') {
          action.value = 'mooving';
        } else {
          action.value = 'resizing';
        }
      }
    } else if (props.isTool === ElementType.Move && elements.value) {
      const element = getElementInPosition(clientX, clientY, elements.value);
      if (element) {
        if (element.type === ElementType.Pensil) {
          const offsetsX = element.points!.map((point) => clientX - point.x)!;
          const offsetsY = element.points!.map((point) => clientY - point.y)!;
          selectedElement!.value = { ...element, offsetsX, offsetsY }!;
        } else {
          const offsetX = clientX - element.x1;
          const offsetY = clientY - element.y1;
          selectedElement!.value = { ...element, offsetX, offsetY }!;
        }
        elements.value = elements.value;
      }
    } else {
      const id = elements.value ? elements.value.length : 0;
      const element = createElement({
        id,
        x1: clientX,
        y1: clientY,
        x2: clientX,
        y2: clientY,
        type: props.isTool,
        color: props.color,
        lineWidth: props.lineWidth
      });
      elements.value = [...elements.value, element];
      selectedElement!.value = element;
      action.value = props.isTool === ElementType.Text ? 'writing' : 'draw';
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = getMouseCoords(e);

    if (action.value === 'panning') {
      const deltaX = clientX - startPanMousePosition.value.x;
      const deltaY = clientY - startPanMousePosition.value.y;
      panOffset.value = {
        x: panOffset.value.x + deltaX,
        y: panOffset.value.y + deltaY
      };
      return;
    }

    if (props.isTool === ElementType.Selection) {
      const element = getElementInPosition(clientX, clientY, elements.value);

      (e.target as HTMLElement)!.style.cursor = element
        ? cursorForPosition(element.position as string)
        : 'default';
    } else if (props.isTool === ElementType.Move) {
      (e.target as HTMLElement)!.style.cursor = 'grab';
    } else if (props.isTool === ElementType.Text) {
      (e.target as HTMLElement)!.style.cursor = 'text';
    } else if (props.isTool === ElementType.Pensil) {
      (e.target as HTMLElement)!.style.cursor = 'url(./icons/cursor.png) 0 30, auto';
    } else if (props.isTool === ElementType.Rectangle) {
      (e.target as HTMLElement)!.style.cursor = 'crosshair';
    }

    if (action.value === 'draw') {
      const index = elements.value.length - 1;
      const { x1, y1 } = elements.value[index];
      updateElement({
        id: index,
        x1,
        y1,
        x2: clientX,
        y2: clientY,
        type: props.isTool,
        color: props.color,
        lineWidth: props.lineWidth
      });
    } else if (action.value === 'mooving') {
      if (selectedElement.value?.type === ElementType.Pensil) {
        const newPoints = selectedElement.value!.points!.map((point, index) => ({
          x: clientX - selectedElement.value!.offsetsX![index]!,
          y: clientY - selectedElement.value!.offsetsY![index]!
        }));

        const elementsCopy = [...elements.value];
        elementsCopy[selectedElement.value!.id] = {
          ...elementsCopy[selectedElement.value!.id],
          points: newPoints,
          x1: newPoints[0].x,
          y1: newPoints[0].y,
          x2: newPoints[newPoints.length - 1].x,
          y2: newPoints[newPoints.length - 1].y
        };
        elements.value = elementsCopy;
      } else {
        const { id, x1, y1, x2, y2, type, offsetX, offsetY, color, lineWidth } =
          selectedElement.value!;
        const width = x2 - x1;
        const height = y2 - y1;
        const nextX1 = clientX - offsetX!;
        const nextY1 = clientY - offsetY!;
        const options = type === ElementType.Text ? { text: selectedElement.value!.text! } : {};
        updateElement({
          id,
          x1: nextX1,
          y1: nextY1,
          x2: nextX1 + width,
          y2: nextY1 + height,
          type,
          options,
          color,
          lineWidth
        });
      }
    } else if (action.value === 'resizing') {
      const { id, type, color, lineWidth, position, ...coordinates } = selectedElement.value!;
      const { x1, x2, y1, y2 } = resizeCoordinates(
        clientX,
        clientY,
        position as string,
        coordinates
      )!;
      updateElement({ id, x1, x2, y1, y2, type, color, lineWidth });
    }
  };

  const adjustmentRequired = (type: ElementType) => [ElementType.Rectangle].includes(type);

  const onMouseUp = (e: MouseEvent) => {
    const { clientX, clientY } = getMouseCoords(e);
    if (selectedElement.value) {
      if (
        selectedElement.value.type === ElementType.Text &&
        clientX - selectedElement.value.offsetX! === selectedElement.value.x1 &&
        clientY - selectedElement.value.offsetY! === selectedElement.value.y1
      ) {
        action.value = 'writing';
        return;
      }
      const index = selectedElement.value?.id;
      const { id, type, color, lineWidth } = elements.value[index];
      if ((action.value === 'draw' || action.value === 'resizing') && adjustmentRequired(type)) {
        const { x1, x2, y1, y2 } = adjustElementCoordinates(elements.value[index]);
        updateElement({ id, x1, x2, y1, y2, type, color, lineWidth });
      }
    }
    if (action.value === 'writing') return;
    action.value = 'none';
    selectedElement.value = null;
    if (action.value === 'panning') {
      action.value = 'none';
    }
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp
  };
}
