<script setup lang="ts">
import { Move, Save, PaintBucket, MousePointer2, Square, Grid3X3 } from 'lucide-vue-next';

const emits = defineEmits<{
  (e: 'onDragg'): void,
  (e: 'onDraw'): void
}>()
</script>


<template>
  <div class="flex gap-4 items-center flex-col p-3 w-14 fixed bg-white rounded-md shadow-xl top-1/2 left-2 -translate-y-1/2">
    <Move @click="emits('onDragg')" />
    <MousePointer2 @click="emits('onDraw')" />
    <Save />
    <Square />
    <Grid3X3 />
  </div>
</template>