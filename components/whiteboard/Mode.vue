<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next';

const {toggleMode, isDark} = useMode()
</script>

<template>
  <div class="flex gap-2 items-center fixed bg-white rounded-md shadow-xl bottom-2 left-2 h-14 w-14 justify-center">
    <Moon v-show="!isDark" class="cursor-pointer" @click="toggleMode()" :size="21" :stroke-width="2" />
    <Sun v-show="isDark" class="cursor-pointer" @click="toggleMode()" :size="21" :stroke-width="2" />
  </div>
</template>
