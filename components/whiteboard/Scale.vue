<script setup lang="ts">
import { Plus, Minus } from 'lucide-vue-next';

const emits = defineEmits<{
  (e: 'minusZoom'): void;
  (e: 'plusZoom'): void;
}>();

const props = defineProps<{
  scale: number;
}>();

const canvasStore = useCanvasStore();
</script>
<template>
  <div
    v-if="canvasStore.canvasSkeleton"
    class="absolute bottom-2 right-2 flex h-12 items-center rounded-md bg-white shadow-xl"
  >
    <div
      @click="emits('minusZoom')"
      class="mr-2 flex h-12 cursor-pointer items-center justify-center rounded-md p-2 active:bg-gray-100"
    >
      <Minus :size="20" :stroke-width="1.8" />
    </div>
    <span class="text-sm font-medium text-gray-950">{{
      new Intl.NumberFormat('en-GB', { style: 'percent' }).format(props.scale)
    }}</span>
    <div
      @click="emits('plusZoom')"
      class="ml-2 flex h-12 cursor-pointer items-center justify-center rounded-md p-2 active:bg-gray-100"
    >
      <Plus :size="20" :stroke-width="1.8" />
    </div>
  </div>
  <UiSkeleton
    class="fixed bottom-2 right-2 h-12 w-[120px] rounded-md bg-gray-200 shadow-xl"
    v-else
  />
</template>
