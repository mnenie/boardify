<script setup lang="ts">
const color = ref<string>("#000");
const line = ref<number>(5);
const radius = ref<number>(2);
const { changeEraser, changePen, changeHighlighterBlack, changeHighlighterRed, changePencilBlack, changePencilRed, changePencilGreen, changePencilBlue, changePencilPurple } = useUiDraw({color, line, radius})

provide('changeColor', { changeEraser, changePen, changeHighlighterBlack, changeHighlighterRed, changePencilBlack, changePencilRed, changePencilGreen, changePencilBlue, changePencilPurple })

</script>

<template>
  <div class="bg-gray-50 h-screen w-screen relative flex justify-center items-center">
    <WhiteboardCanvas :color="color" :line="line" :radius="radius" />
    <WhiteboardName />
    <WhiteboardDrawSettings />
    <WhiteboardUsers />
    <WhiteboardScale />
    <WhiteboardMode />
    <WhiteboardDrawItems />
  </div>
</template>

