<script setup lang="ts">
import {Undo2,Redo2} from 'lucide-vue-next';
import { useCanvasStore } from '~/store/canvas.store';

const canvasStore = useCanvasStore()
</script>

<template>
  <div v-if="canvasStore.canvasSkeleton" class="flex gap-5 items-center p-2 fixed bg-white rounded-md shadow-xl bottom-2 h-12 right-32">
    <Undo2 :size="20" :stroke-width="1.8" />
    <Redo2 :size="20" :stroke-width="1.8" />
  </div>
  <UiSkeleton class="h-12 fixed bg-gray-200 rounded-md shadow-xl bottom-2 right-32 w-[76px]" v-else />
</template>
