<script setup lang="ts">
useSeoMeta({
  title: 'Boardify - virtual whiteboard for collaborative solutions'
})

definePageMeta({
  middleware: 'auth'
})
const color = ref<string>("#000");
const line = ref<number>(5);
const radius = ref<number>(2);
const { changeEraser, changePen, changeHighlighterBlack, changeHighlighterRed, changePencilBlack, changePencilRed, changePencilGreen, changePencilBlue, changePencilPurple } = useUiDraw({ color, line, radius })

provide('changeColor', { changeEraser, changePen, changeHighlighterBlack, changeHighlighterRed, changePencilBlack, changePencilRed, changePencilGreen, changePencilBlue, changePencilPurple })

const isDragg = ref(false)

const onDragg = () => {
  isDragg.value = true
}

const onDraw = () => {
  isDragg.value = false
}

</script>

<template>
  <div class="bg-gray-50 relative w-screen h-screen">
    <WhiteboardCanvas :color="color" :line="line" :radius="radius" :is-draggable="isDragg" />
    <WhiteboardName />
    <WhiteboardDrawSettings @on-dragg="onDragg" @on-draw="onDraw" />
    <WhiteboardUsers />
    <WhiteboardScale />
    <WhiteboardMode />
    <WhiteboardDrawItems />
  </div>
</template>

<style scoped>
</style>

