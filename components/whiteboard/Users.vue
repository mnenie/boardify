<script setup lang="ts">
import { LogOut } from 'lucide-vue-next';
const emit = defineEmits<{
  (e: 'logout'): void
}>()
</script>

<template>
  <div class="flex gap-2 items-center p-3 fixed bg-white rounded-md shadow-xl top-2 right-2 h-14">
    <div class="bg-red-300 flex items-center justify-center w-8 h-8 rounded-full mr-2">
      <span class="text-white text-lg font-normal">A</span>
    </div>
    <div class="h-5 w-px bg-gray-400 mr-2"></div>
    <LogOut class="cursor-pointer" @click="emit('logout')" :size="19" :stroke-width="1.8" />
  </div>
</template>
