<script setup lang="ts">
import { Plus, Minus } from "lucide-vue-next";

const emits = defineEmits<{
  (e: 'minusZoom'): void,
  (e: 'plusZoom'): void
}>()

const props = defineProps<{
  scale: number
}>()

const canvasStore = useCanvasStore()

</script>
<template>
  <div
    v-if="canvasStore.canvasSkeleton"
    class="flex gap-2 items-center p-2 fixed bg-white rounded-md shadow-xl bottom-2 right-2 h-12"
  >
    <Minus @click="emits('minusZoom')" :size="20" :stroke-width="1.8" />
    <span class="text-sm font-medium text-gray-950">{{ new Intl.NumberFormat("en-GB", {style: "percent"}).format(props.scale) }}</span>
    <Plus @click="emits('plusZoom')" :size="20" :stroke-width="1.8" />
  </div>
  <UiSkeleton
    class="h-12 fixed bg-gray-200 rounded-md shadow-xl bottom-2 right-2 w-[92px]"
    v-else
  />
</template>
