<script setup lang="ts">
import { Settings, ExternalLink, Trash2 } from 'lucide-vue-next';
import { useCanvasStore } from '~/store/canvas.store';
const online = useOnline();
const { isLoading, data } = useUsersQuery();

const emit = defineEmits<{
  (e: 'onDelete'): void;
}>();

const project = computed(() => {
  return 'ffsdfds';
});
const canvasStore = useCanvasStore();

onMounted(async () => {
  await canvasStore.getBoard();
});
</script>

<template>
  <div
    v-if="canvasStore.canvasSkeleton"
    class="absolute left-2 top-2 flex h-12 items-center gap-2 rounded-md bg-white p-2 shadow-xl"
  >
    <p class="select-none pr-2 text-2xl font-medium text-gray-950">Boardify</p>
    <div class="mr-2 h-5 w-px bg-gray-300"></div>
    <div class="flex items-center gap-2 pr-2">
      <span v-if="!isLoading" class="select-none text-lg font-normal text-gray-950">{{
        canvasStore.board.name
      }}</span>
      <UiSkeleton v-else-if="isLoading" class="h-5 w-[100px]"></UiSkeleton>
      <div v-if="online" class="h-2 w-2 rounded-full bg-green-600"></div>
      <div v-else class="h-2 w-2 rounded-full bg-amber-500"></div>
    </div>
    <div class="mr-2 h-5 w-px bg-gray-300"></div>
    <div class="flex items-center gap-3">
      <WhiteboardChangeSheet v-model:project="project">
        <Settings class="cursor-pointer" :size="20" :stroke-width="1.8" />
      </WhiteboardChangeSheet>
      <WhiteboardCanvasAlert @on-delete="emit('onDelete')">
        <Trash2 class="cursor-pointer" :size="20" :stroke-width="1.8" />
      </WhiteboardCanvasAlert>
      <ExternalLink class="cursor-pointer" :size="20" :stroke-width="1.8" />
    </div>
  </div>
  <UiSkeleton class="fixed left-2 top-2 h-12 w-[390px] rounded-md bg-gray-200 shadow-xl" v-else />
</template>
