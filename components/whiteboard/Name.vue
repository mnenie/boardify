<script setup lang="ts">
import { Settings, ExternalLink, Trash2 } from "lucide-vue-next";
import { useCanvasStore } from "~/store/canvas.store";
const online = useOnline();
const {isLoading, data} = useUsersQuery()

const project = computed(() =>{
  return 'ffsdfds'
})
const canvasStore = useCanvasStore()

onMounted(async () => {
  await canvasStore.getBoard()
})
</script>

<template>
  <div v-if="canvasStore.canvasSkeleton"
    class="flex gap-2 items-center p-2 h-12 absolute bg-white rounded-md shadow-xl top-2 left-2"
  >
    <p class="text-gray-950 text-2xl font-medium pr-2 select-none">Boardify</p>
    <div class="h-5 w-px bg-gray-300 mr-2"></div>
    <div class="flex gap-2 items-center pr-2">
      <span v-if="!isLoading" class="text-gray-950 text-lg font-normal select-none">{{ canvasStore.board.name }}</span>
      <UiSkeleton v-else-if="isLoading" class="w-[100px] h-5"></UiSkeleton>
      <div v-if="online" class="rounded-full bg-green-600 w-2 h-2"></div>
      <div v-else class="rounded-full bg-amber-500 w-2 h-2"></div>
    </div>
    <div class="h-5 w-px bg-gray-300 mr-2"></div>
    <div class="flex items-center gap-3">
      <WhiteboardChangeSheet v-model:project="project">
        <Settings class="cursor-pointer" :size="20" :stroke-width="1.8" />
      </WhiteboardChangeSheet>
      <Trash2 class="cursor-pointer" :size="20" :stroke-width="1.8" />
      <ExternalLink class="cursor-pointer" :size="20" :stroke-width="1.8" />
    </div>
  </div>
  <UiSkeleton class="h-12 fixed bg-gray-200 rounded-md shadow-xl top-2 left-2 w-[390px]" v-else />
</template>
