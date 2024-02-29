import { ElementType } from "~/types/element.type";

export default function useUiSettingsDraw() {
  const isDragg = ref<boolean>(false);
  const isRectangle = ref<boolean>(false);
  const isLine = ref<boolean>(false);
  const isTool = ref<ElementType>(ElementType.Pensil)

  const onSelect = () => {
    isTool.value = ElementType.Selection
  };
  const onDraw = () => {
    isTool.value = ElementType.Pensil
  };

  const isGrid = ref<boolean>(true);
  const onGrid = () => {
    isGrid.value = true;
  };
  const deleteGrid = () => {
    isGrid.value = false;
  };

  const isSave = ref<boolean>(false);
  const saveImage = () => {
    isSave.value = true;
  };

  const resetImage = () => {
    isSave.value = false;
  };

  const onRectangle = () => {
    isTool.value = ElementType.Rectangle
  };

  const onText = () => {
    isTool.value = ElementType.Text
  }

  const onDraggable = () => {
    isTool.value = ElementType.Move
  }


  return {
    isSave,
    isDragg,
    isGrid,
    resetImage,
    saveImage,
    onDraggable,
    onDraw,
    onGrid,
    deleteGrid,
    onRectangle,
    isRectangle,
    isTool,
    onText,
    onSelect
  };
}
