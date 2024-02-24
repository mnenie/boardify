<script setup lang="ts">
import { Plus, Minus } from 'lucide-vue-next';
</script>

<template>
  <div class="flex gap-2 items-center p-2 fixed bg-white rounded-md shadow-xl bottom-2 right-2 h-12">
    <Minus :size="20" :stroke-width="1.8" />
    <span class="text-sm font-medium text-gray-950">100</span>
    <Plus :size="20" :stroke-width="1.8" />
  </div>
</template>
