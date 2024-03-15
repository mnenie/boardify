<script setup lang="ts">
import type { Element } from '~/types/element.type';
import { useWindowSize } from '@vueuse/core'

useSeoMeta({
  title: 'Boardify - virtual whiteboard for collaborative solutions'
});
definePageMeta({
  middleware: 'auth'
});

const color = ref<string>('#000');
const lineWidth = ref<number>(5.3);
const elements = ref<Element[]>([]);
const canvas = ref<HTMLCanvasElement | null>(null);

const history = ref<Element[][]>([]);
const redoHistory = ref<Element[][]>([]);

const {
  changeWhitePen,
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
  changeWhitePen,
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
  isSave,
  deleteGrid,
  onRectangle,
  isTool,
  onText,
  resetImage
} = useUiSettingsDraw();

provide('saveImage', { saveImage });

const { onDelete } = useRemoveCanvas(elements);

const authStore = useAuthStore();
const canvasStore = useCanvasStore();

onMounted(async () => {
  await authStore.getCurrentSessionUser();
  canvasStore.setCanvasSkeleton();
});

const { width, height } = useWindowSize()
</script>

<template>
  <div v-if="width > 992" class="relative h-screen w-full select-none bg-gray-50">
    <WhiteboardCanvas
      :canvas="canvas"
      :is-tool="isTool"
      :color="color"
      :line-width="lineWidth"
      :elements="elements"
      :history="history"
      :redo-history="redoHistory"
      :is-save="isSave"
      @reset-img-tool="resetImage"
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
    <WhiteboardMode />
    <WhiteboardDrawItems />
  </div>
  <div v-else class="h-screen w-full flex justify-center">
    <ScreenNotAvailable />
  </div>
</template>
