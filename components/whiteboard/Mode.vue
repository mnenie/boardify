<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next';
import { useCanvasStore } from '~/store/canvas.store';

const {toggleMode, isDark} = useMode()
const canvasSkeleton = useCanvasStore()
</script>

<template>
  <div v-if="canvasSkeleton.canvasSkeleton" @click="toggleMode()" class="flex gap-2 items-center fixed bg-white rounded-md shadow-xl bottom-2 left-2 h-12 w-12 justify-center cursor-pointer">
    <Moon v-show="isDark" :size="20" :stroke-width="2" />
    <Sun v-show="!isDark" :size="20" :stroke-width="2" />
  </div>
  <UiSkeleton class="h-12 fixed bg-gray-200 rounded-md shadow-xl bottom-2 left-2 w-12" v-else />
</template>
