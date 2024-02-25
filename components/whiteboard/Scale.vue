<script setup lang="ts">
import { Plus, Minus } from 'lucide-vue-next';
import { useCanvasStore } from '~/store/canvas.store';

const canvasStore = useCanvasStore()
</script>

<template>
  <div v-if="canvasStore.canvasSkeleton" class="flex gap-2 items-center p-2 fixed bg-white rounded-md shadow-xl bottom-2 right-2 h-12">
    <Minus :size="20" :stroke-width="1.8" />
    <span class="text-sm font-medium text-gray-950">100</span>
    <Plus :size="20" :stroke-width="1.8" />
  </div>
  <UiSkeleton class="h-12 fixed bg-gray-200 rounded-md shadow-xl bottom-2 right-2 w-[92px]" v-else />
</template>
