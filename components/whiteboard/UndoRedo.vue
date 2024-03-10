<script setup lang="ts">
import { Undo2, Redo2 } from 'lucide-vue-next';
import { useCanvasStore } from '~/store/canvas.store';
import type { UndoRedo } from '~/types/methods.type';

const canvasStore = useCanvasStore();
const emits = defineEmits<{
  (e: 'undo'): void,
  (e:'redo'): void
}>()
</script>

<template>
  <div
    v-if="canvasStore.canvasSkeleton"
    class="fixed bottom-2 right-32 flex h-12 items-center gap-5 rounded-md bg-white p-2 shadow-xl"
  >
    <Undo2 :size="20" :stroke-width="1.8" @click="emits('undo')" class="cursor-pointer" />
    <Redo2 :size="20" :stroke-width="1.8" @click="emits('redo')" class="cursor-pointer" />
  </div>
  <UiSkeleton
    v-else
    class="fixed bottom-2 right-32 h-12 w-[76px] rounded-md bg-gray-200 shadow-xl"
  />
</template>
