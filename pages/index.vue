<script setup lang="ts">
useSeoMeta({
  title: 'Boardify - virtual whiteboard for collaborative solutions'
})

definePageMeta({
  middleware: 'auth'
})
const color = ref<string>("#000");
const line = ref<number>(3.3);
const radius = ref<number>(0.2);
const { changeEraser, changePen, changeHighlighterBlack, changeHighlighterRed, changePencilBlack, changePencilRed, changePencilGreen, changePencilBlue, changePencilPurple } = useUiDraw({ color, line, radius })

provide('changeColor', { changeEraser, changePen, changeHighlighterBlack, changeHighlighterRed, changePencilBlack, changePencilRed, changePencilGreen, changePencilBlue, changePencilPurple })

const {saveImage, resetImage, isDragg, isGrid, isSave, onDragg, onDraw, onGrid, deleteGrid} = useUiSettingsDraw()

provide('saveImage', {saveImage})
</script>

<template>
  <div class="bg-gray-50 relative w-screen h-screen board">
    <WhiteboardCanvas :color="color" :line="line" :radius="radius" :is-draggable="isDragg" :is-grid="isGrid" :on-save="isSave" @image-state-reset="resetImage" />
    <WhiteboardName />
    <WhiteboardDrawSettings @on-save="saveImage" @on-dragg="onDragg" @on-draw="onDraw" @on-grid="onGrid" @delete-grid="deleteGrid" />
    <WhiteboardUsers />
    <WhiteboardScale />
    <WhiteboardMode />
    <WhiteboardDrawItems />
  </div>
</template>

<style scoped>
.board{
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
</style>

