<script setup lang="ts">
import { Settings, ExternalLink, Trash2 } from "lucide-vue-next";
const online = useOnline();

const project = ref("default project");
</script>

<template>
  <div
    class="flex gap-2 items-center p-2 h-12 fixed bg-white rounded-md shadow-xl top-2 left-2"
  >
    <p class="text-gray-950 text-2xl font-medium pr-2">Boardify</p>
    <div class="h-5 w-px bg-gray-300 mr-2"></div>
    <div class="flex gap-2 items-center pr-2">
      <span class="text-gray-950 text-lg font-normal">{{ project }}</span>
      <div v-if="online" class="rounded-full bg-green-600 w-2 h-2"></div>
      <div v-else class="rounded-full bg-amber-500 w-2 h-2"></div>
    </div>
    <div class="h-5 w-px bg-gray-300 mr-2"></div>
    <div class="flex items-center gap-3">
      <WhiteboardChangeSheet v-model:project="project">
        <Settings class="cursor-pointer" :size="20" :stroke-width="1.8" />
      </WhiteboardChangeSheet>
      <ExternalLink class="cursor-pointer" :size="20" :stroke-width="1.8" />
      <Trash2 class="cursor-pointer" :size="20" :stroke-width="1.8" />
    </div>
  </div>
</template>
