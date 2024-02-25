<script setup lang="ts">
import { useCanvasStore } from '~/store/canvas.store';
import type { ChangeColorMethods } from '~/types/methods.type';
import type { IDrawUi } from '~/types/ui.interfase';
const injectedMethods: ChangeColorMethods | undefined = inject('changeColor');
const { changeEraser, changePen, changeHighlighterBlack, changePencilBlack, changePencilRed, changePencilGreen, changePencilBlue, changePencilPurple, changeHighlighterRed } = injectedMethods || {};

const draws = ref<IDrawUi[]>([
  { id: 0, src: './img/eraser.jpg', active: false, event: changeEraser },
  { id: 1, src: '/img/pen.jpg', active: true, event: changePen },
  { id: 2, src: '/img/black.jpg', active: false, event: changePencilBlack },
  { id: 3, src: '/img/red.jpg', active: false, event: changePencilRed },
  { id: 4, src: '/img/green.jpg', active: false, event: changePencilGreen },
  { id: 5, src: '/img/purple.jpg', active: false, event: changePencilPurple },
  { id: 6, src: '/img/blue.jpg', active: false, event: changePencilBlue },
  { id: 7, src: '/img/marker-black.jpg', active: false, event: changeHighlighterBlack },
  { id: 8, src: '/img/marker-red.jpg', active: false, event: changeHighlighterRed },
])

const changeActiveElement = (id: number) => {
  const selectedElement = draws.value.find(i => i.id == id)
  selectedElement && selectedElement.event && selectedElement.event();
  draws.value.map((btn, i) => {
    btn.active = i === id
  })
}

const canvasStore = useCanvasStore()
</script>

<template>
  <div v-if="canvasStore.canvasSkeleton"
    class="flex gap-8 items-center p-2 fixed bg-white rounded-md shadow-xl bottom-2 right-1/2 translate-x-1/2 h-12 overflow-hidden">
    <NuxtImg v-for="item in draws" @click="changeActiveElement(item.id)" class="mt-12 w-6 h-20 transition duration-300 ease-in cursor-pointer" :src="item.src" :class="{'active' : item.active}" />
  </div>
  <UiSkeleton class="h-12 fixed bg-gray-200 rounded-md shadow-xl bottom-2 right-1/2 translate-x-1/2 w-[480px]" v-else />
</template>

<style scoped>
.active{
  margin-top: 36px;
}
</style>