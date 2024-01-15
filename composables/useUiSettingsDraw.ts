export default function useUiSettingsDraw() {
  const isDragg = ref<boolean>(false);
  const onDragg = () => {
    isDragg.value = true;
  };
  const onDraw = () => {
    isDragg.value = false;
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

  return {
    isSave, isDragg, isGrid, resetImage, saveImage, onDragg, onDraw, onGrid, deleteGrid
  }
}
