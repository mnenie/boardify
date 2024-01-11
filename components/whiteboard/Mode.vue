<script setup lang="ts">
import { Moon } from 'lucide-vue-next';
</script>

<template>
  <div class="flex gap-2 items-center fixed bg-white rounded-md shadow-xl bottom-2 left-2 h-14 w-14 justify-center">
    <Moon :size="21" :stroke-width="2" />
  </div>
</template>
