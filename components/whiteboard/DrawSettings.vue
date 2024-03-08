<script setup lang="ts">
import {
  Save,
  MousePointer2,
  Square,
  Grid3X3,
  FileUp,
  Hand,
  RectangleHorizontal,
  ALargeSmall,
  Pen
} from 'lucide-vue-next';
import { useCanvasStore } from '~/store/canvas.store';
import { usePresentation } from '~/store/presentation.store';
import type { IDrawSettings } from '~/types/ui.interfase';

const emits = defineEmits<{
  (e: 'onDraggable'): void;
  (e: 'onSelect'): void;
  (e: 'onDraw'): void;
  (e: 'deleteGrid'): void;
  (e: 'onSave'): void;
  (e: 'onUpload'): void;
  (e: 'onRectangle'): void;
  (e: 'onText'): void;
}>();

//@ts-ignore
const { saveImage } = inject('saveImage');

const settingsGrids = ref<IDrawSettings[]>([
  { id: 0, active: true, icon: Square, event: () => emits('deleteGrid') }
]);

//experimental feature onDragg
const settingsMove = ref<IDrawSettings[]>([
  { id: 0, active: false, icon: Hand, event: () => emits('onDraggable') },
  { id: 1, active: false, icon: MousePointer2, event: () => emits('onSelect') },
  { id: 2, active: true, icon: Pen, event: () => emits('onDraw') },
  { id: 3, active: false, icon: RectangleHorizontal, event: () => emits('onRectangle') },
  { id: 4, active: false, icon: ALargeSmall, event: () => emits('onText') }
]);
const settingsFiles = ref<IDrawSettings[]>([
  { id: 0, icon: Save, event: saveImage },
  { id: 1, icon: FileUp, event: () => emits('onUpload') }
]);

const changeActiveGridsSettings = (id: number) => {
  const activeSetting = settingsGrids.value.find((i) => i.id === id);
  if (activeSetting && activeSetting.event) {
    activeSetting.event();
  }
  settingsGrids.value.map((btn, i) => {
    btn.active = i === id;
  });
};
const changeActiveMoveSettings = (id: number) => {
  const activeSetting = settingsMove.value.find((i) => i.id === id);
  if (activeSetting && activeSetting.event) {
    activeSetting.event();
  }
  settingsMove.value.map((btn, i) => {
    btn.active = i === id;
  });
};

const canvasSkeleton = useCanvasStore();
const presentationStore = usePresentation();
</script>

<template>
  <div v-show="!presentationStore.presentation">
    <div
      v-if="canvasSkeleton.canvasSkeleton"
      class="fixed left-2 top-1/2 flex w-12 -translate-y-1/2 flex-col items-center gap-1 rounded-md bg-white p-2 shadow-xl"
    >
      <div v-for="i in settingsMove" class="rounded-md p-1.5" :class="{ active: i.active }">
        <component
          :size="22"
          :stroke-width="1.8"
          :is="i.icon"
          class="cursor-pointer"
          @click="changeActiveMoveSettings(i.id)"
        />
      </div>
      <div v-for="i in settingsFiles" class="rounded-md p-1.5">
        <component
          :size="22"
          :stroke-width="1.8"
          :is="i.icon"
          class="cursor-pointer"
          @click="i.event"
        />
      </div>
      <div v-for="i in settingsGrids" class="rounded-md p-1.5" :class="{ active: i.active }">
        <component
          :size="22"
          :stroke-width="1.8"
          :is="i.icon"
          class="cursor-pointer"
          @click="changeActiveGridsSettings(i.id)"
        />
      </div>
    </div>
    <UiSkeleton
      class="fixed left-2 top-1/2 h-[300px] w-12 -translate-y-1/2 rounded-md bg-gray-200 shadow-xl"
      v-else
    />
  </div>
</template>

<style scoped>
.active {
  background: rgb(243 244 246);
}
</style>
