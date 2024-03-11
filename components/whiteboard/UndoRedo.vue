<script setup lang="ts">
import { Undo2, Redo2 } from 'lucide-vue-next';
import { useCanvasStore } from '~/store/canvas.store';

const canvasStore = useCanvasStore();
const emits = defineEmits<{
  (e: 'undo'): void;
  (e: 'redo'): void;
}>();

const isActiveUndo = ref(false);
const isActiveRedo = ref(false);

const handleKeyPress = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
    isActiveUndo.value = true;
  } else if (
    (event.ctrlKey || event.metaKey) &&
    (event.key === 'y' || (event.shiftKey && event.key === 'Z'))
  ) {
    isActiveRedo.value = true;
  }
};

const handleKeyUp = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
    isActiveUndo.value = false;
  } else if (
    (event.ctrlKey || event.metaKey) &&
    (event.key === 'y' || (event.shiftKey && event.key === 'Z'))
  ) {
    isActiveRedo.value = false;
  }
};

watchEffect(() => {
  if (window) {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);
  }
});
</script>

<template>
  <div
    v-if="canvasStore.canvasSkeleton"
    class="absolute bottom-2 right-36 flex h-12 items-center rounded-md bg-white shadow-xl"
  >
    <div
      @click="emits('undo')"
      class="flex h-12 cursor-pointer items-center justify-center rounded-md pb-2 pl-2 pr-2.5 pt-2 active:bg-gray-100"
      :class="{ 'bg-gray-100': isActiveUndo }"
    >
      <Undo2 :size="20" :stroke-width="1.8" />
    </div>
    <div
      @click="emits('redo')"
      class="flex h-12 cursor-pointer items-center justify-center rounded-md pb-2 pl-2.5 pr-2 pt-2 active:bg-gray-100"
      :class="{ 'bg-gray-100': isActiveRedo }"
    >
      <Redo2 :size="20" :stroke-width="1.8" />
    </div>
  </div>
  <UiSkeleton
    v-else
    class="fixed bottom-2 right-36 h-12 w-[76px] rounded-md bg-gray-200 shadow-xl"
  />
</template>
