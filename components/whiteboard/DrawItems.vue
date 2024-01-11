<script setup lang="ts">
import { Eraser, Highlighter, Ruler, PenTool, Pen, Palette } from 'lucide-vue-next';

const { changeEraser } = inject('eraseColor')

</script>

<template>
  <div class="flex gap-8 items-center p-3 fixed bg-white rounded-md shadow-xl bottom-2 right-1/2 translate-x-1/2 h-14 overflow-hidden">
    <Eraser class="cursor-pointer" @click="changeEraser" />
    <Highlighter class="cursor-pointer" />
    <PenTool class="cursor-pointer" />
    <Pen class="cursor-pointer" />
    <Ruler class="cursor-pointer" />
    <Palette class="cursor-pointer" />
  </div>
</template>
