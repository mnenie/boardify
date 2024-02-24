<script setup lang="ts">
import {Undo2,Redo2} from 'lucide-vue-next'
</script>

<template>
  <div class="flex gap-5 items-center p-2 fixed bg-white rounded-md shadow-xl bottom-2 h-12 right-32">
    <Undo2 :size="20" :stroke-width="1.8" />
    <Redo2 :size="20" :stroke-width="1.8" />
  </div>
</template>
