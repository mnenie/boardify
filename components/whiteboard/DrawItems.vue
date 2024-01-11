<script setup lang="ts">
import { Eraser, Highlighter, Ruler, PenTool, Pen, Palette } from 'lucide-vue-next';
</script>

<template>
  <div class="flex gap-8 items-center p-3 fixed bg-white rounded-md shadow-xl bottom-2 right-1/2 translate-x-1/2 h-14 overflow-hidden">
    <Eraser />
    <Highlighter />
    <PenTool />
    <Pen />
    <Ruler />
    <Palette />
  </div>
</template>
