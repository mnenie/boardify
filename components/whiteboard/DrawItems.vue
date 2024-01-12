<script setup lang="ts">
import { Eraser, Highlighter, Ruler, PenTool, Pen, Palette } from 'lucide-vue-next';

const { changeEraser, changePen, changeHighlighter, changePenTool, changePalette } = inject('changeColor')

const items = ref([
  { id: 0, active: false, name: Eraser, event: changeEraser, size: 24, strokeWidth: 2 },
  { id: 1, active: false, name: Highlighter, event: changeHighlighter, size: 24, strokeWidth: 2 },
  { id: 2, active: false, name: PenTool, event: changePenTool, size: 24, strokeWidth: 2 },
  { id: 3, active: true, name: Pen, event: changePen, size: 24, strokeWidth: 2 },
  { id: 4, active: false, name: Palette, event: changePalette, size: 24, strokeWidth: 2 },
])


const changeEvent = (id: number) => {
  const selectedButton = items.value.find(btn => btn.id === id);
  if(selectedButton){
    selectedButton.event()
  }
  items.value.map((btn, i) => {
    btn.active = i === id
  })
}
</script>

<template>
  <div
    class="flex gap-2 items-center p-3 fixed bg-white rounded-md shadow-xl bottom-2 right-1/2 translate-x-1/2 h-14 overflow-hidden">
    <div class="rounded-md p-3" v-for="i in items" :class="{ 'active': i.active }">
      <component :key="i.id" :is="i.name" @click="changeEvent(i.id);" :size="i.size" :stroke-width="i.strokeWidth" :color="i.active ? 'rgb(5 150 105)' : 'currentColor'" class="cursor-pointer" />
    </div>
  </div>
</template>

<style scoped>
.active {
  background-color: rgba(110, 231, 183, 0.1);
}
</style>
