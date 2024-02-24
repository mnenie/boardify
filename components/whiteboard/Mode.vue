<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next';

const {toggleMode, isDark} = useMode()
</script>

<template>
  <div @click="toggleMode()" class="flex gap-2 items-center fixed bg-white rounded-md shadow-xl bottom-2 left-2 h-12 w-12 justify-center cursor-pointer">
    <Moon v-show="isDark" :size="21" :stroke-width="2" />
    <Sun v-show="!isDark" :size="21" :stroke-width="2" />
  </div>
</template>
