<script setup lang="ts">
import type { Element } from '~/types/element.type';

useSeoMeta({
  title: 'Boardify - virtual whiteboard for collaborative solutions'
});
definePageMeta({
  middleware: 'auth'
});

const color = ref<string>('#000');
const lineWidth = ref<number>(5.3);
const elements = ref<Element[]>([]);

const {
  changeEraser,
  changePen,
  changeHighlighterBlack,
  changeHighlighterRed,
  changePencilBlack,
  changePencilRed,
  changePencilGreen,
  changePencilBlue,
  changePencilPurple
} = useUiDraw({ color, lineWidth });

provide('changeColor', {
  changeEraser,
  changePen,
  changeHighlighterBlack,
  changeHighlighterRed,
  changePencilBlack,
  changePencilRed,
  changePencilGreen,
  changePencilBlue,
  changePencilPurple
});

const {
  saveImage,
  onDraggable,
  onSelect,
  onDraw,
  onGrid,
  deleteGrid,
  onRectangle,
  isTool,
  onText
} = useUiSettingsDraw();

provide('saveImage', { saveImage });

const { onDelete } = useRemoveCanvas(elements);

const authStore = useAuthStore();
const canvasStore = useCanvasStore();

onMounted(async () => {
  await authStore.getCurrentSessionUser();
  canvasStore.setCanvasSkeleton();
});
</script>

<template>
  <div class="relative h-screen w-full select-none bg-gray-50">
    <WhiteboardCanvas
      :is-tool="isTool"
      :color="color"
      :line-width="lineWidth"
      :elements="elements"
    />
    <WhiteboardName @on-delete="onDelete" />
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
    <WhiteboardUsers @on-draggable="onDraggable" @on-draw="onDraw" />
    <WhiteboardScale @minus-zoom="" />
    <WhiteboardMode />
    <WhiteboardDrawItems />
    <WhiteboardUndoRedo />
  </div>
</template>
