<script setup lang="ts">
import type { ChangeColorMethods } from '~/types/methods.type';
import type { IDrawUi } from '~/types/ui.interfase';
const injectedMethods: ChangeColorMethods | undefined = inject('changeColor');
const {
  changeEraser,
  changePen,
  changeHighlighterBlack,
  changePencilBlack,
  changePencilRed,
  changePencilGreen,
  changePencilBlue,
  changePencilPurple,
  changeHighlighterRed
} = injectedMethods || {};

const draws = ref<IDrawUi[]>([
  { id: 0, src: '/img/white-pen.jpg', active: false, event: changeEraser },
  { id: 1, src: '/img/pen.jpg', active: true, event: changePen },
  { id: 2, src: '/img/black.jpg', active: false, event: changePencilBlack },
  { id: 3, src: '/img/red.jpg', active: false, event: changePencilRed },
  { id: 4, src: '/img/green.jpg', active: false, event: changePencilGreen },
  { id: 5, src: '/img/purple.jpg', active: false, event: changePencilPurple },
  { id: 6, src: '/img/blue.jpg', active: false, event: changePencilBlue },
  { id: 7, src: '/img/marker-black.jpg', active: false, event: changeHighlighterBlack },
  { id: 8, src: '/img/marker-red.jpg', active: false, event: changeHighlighterRed }
]);

const changeActiveElement = (id: number) => {
  const selectedElement = draws.value.find((i) => i.id == id);
  selectedElement && selectedElement.event && selectedElement.event();
  draws.value.map((btn, i) => {
    btn.active = i === id;
  });
};

const canvasStore = useCanvasStore();
const presentationStore = usePresentation();
</script>

<template>
  <div v-show="!presentationStore.presentation">
    <div
      v-if="canvasStore.canvasSkeleton"
      class="fixed bottom-2 right-1/2 flex h-12 translate-x-1/2 items-center gap-8 overflow-hidden rounded-md bg-white p-2 shadow-xl"
    >
      <img
        v-for="item in draws"
        @click="changeActiveElement(item.id)"
        class="mt-12 h-20 w-[23px] cursor-pointer transition duration-300 ease-in"
        :src="item.src"
        :class="{ active: item.active }"
      />
    </div>
    <UiSkeleton
      v-else
      class="fixed bottom-2 right-1/2 h-12 w-[480px] translate-x-1/2 rounded-md bg-gray-200 shadow-xl"
    />
  </div>
</template>

<style scoped>
.active {
  margin-top: 36px;
}
</style>
