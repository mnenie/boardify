import type { Element } from "~/types/element.type";

export default function useTextArea(
  selectedElement: Ref<Element | null>,
  action: Ref<string>,
  elements: Ref<Element[]>,
  canvas: Ref<HTMLCanvasElement | null>,
) {
  const { updateElement } = useCanvasParams(elements, canvas);
  const handleBlur = (e: Event) => {
    const { id, x1, y1, type } = selectedElement.value!;
    action.value = "none";
    selectedElement!.value = null;

    const target = e.target as HTMLTextAreaElement;
    updateElement({
      id: id,
      x1: x1,
      y1: y1,
      type: type,
      x2: 0,
      y2: 0,
      options: { text: target.value },
    });
  };

  return {
    handleBlur,
  };
}
