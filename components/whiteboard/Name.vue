<script setup lang="ts">
import {Settings, Share2, Plus, Share} from 'lucide-vue-next'
</script>

<template>
  <div class="flex gap-2 items-center p-3 fixed bg-white rounded-md shadow-xl top-2 left-2 h-14">
    <p class="text-gray-950 text-2xl font-medium pr-2">Boardify</p>
    <div class="h-5 w-px bg-gray-400 mr-2"></div>
    <div class="flex gap-2 items-center pr-2">
      <span class="text-gray-950 text-lg font-normal">Project1</span>
      <div class="rounded-full bg-green-600 w-2 h-2"></div>
    </div>
    <div class="h-5 w-px bg-gray-400 mr-2"></div>
    <Plus :size="22" :stroke-width="1.8" />
    <Settings :size="20" :stroke-width="1.8" />
    <Share2 :size="18" :stroke-width="1.8" />
  </div>
</template>