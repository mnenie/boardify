<script setup lang="ts">
useSeoMeta({
  title: "Boardify - virtual whiteboard for collaborative solutions",
});
definePageMeta({
  middleware: "auth",
});

const color = ref<string>("#000");
const line = ref<number>(3.3);
const radius = ref<number>(0.2);

const {
  changeEraser,
  changePen,
  changeHighlighterBlack,
  changeHighlighterRed,
  changePencilBlack,
  changePencilRed,
  changePencilGreen,
  changePencilBlue,
  changePencilPurple,
} = useUiDraw({ color, line, radius });

provide("changeColor", {
  changeEraser,
  changePen,
  changeHighlighterBlack,
  changeHighlighterRed,
  changePencilBlack,
  changePencilRed,
  changePencilGreen,
  changePencilBlue,
  changePencilPurple,
});

const {
  saveImage,
  resetImage,
  isDragg,
  isGrid,
  isSave,
  onDraggable,
  onSelect,
  onDraw,
  onGrid,
  deleteGrid,
  isRectangle,
  onRectangle,
  isTool,
  onText,
} = useUiSettingsDraw();

provide("saveImage", { saveImage });

const authStore = useAuthStore();
const canvasStore = useCanvasStore();

onMounted(async () => {
  await authStore.getCurrentSessionUser();
  canvasStore.setCanvasSkeleton();
});
</script>

<template>
  <div class="h-screen w-full relative bg-gray-50 select-none">
    <WhiteboardCanvas :is-tool="isTool" />
    <WhiteboardName />
    <WhiteboardDrawSettings
      @on-save="saveImage"
      @on-draggable="onDraggable"
      @on-draw="onDraw"
      @on-grid="onGrid"
      @delete-grid="deleteGrid"
      @on-rectangle="onRectangle"
      @on-text="onText"
      @on-select="onSelect"
    />
    <WhiteboardUsers />
    <WhiteboardScale @minus-zoom="" />
    <WhiteboardMode />
    <WhiteboardDrawItems />
    <WhiteboardUndoRedo />
  </div>
</template>

<style scoped></style>
